
var Map = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  componentDidMount() {
    this.createMap()
  },
  
  getInitialState() { return {
    markers: {},
    premarker: null,
  }},
  
  createMap(element) {
    L.Icon.Default.imagePath = "css/images"
    
    this.map = L.map(this.getDOMNode(), { doubleClickZoom: false })
    
    var layer_osm = name =>
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      })
    
    var layer_thunderforest = name =>
      L.tileLayer('http://{s}.tile.thunderforest.com/'+name+'/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    
    var layer_mapquest_sat = name =>
      L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
        type: 'sat',
        ext: 'jpg',
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
        subdomains: '1234'
      })
    
    this.layers = {
      "default":   layer_osm(),
      "sat":       layer_mapquest_sat(),
      "cycle":     layer_thunderforest("cycle"),
      "outdoors":  layer_thunderforest("outdoors"),
      "landscape": layer_thunderforest("landscape"),
      "transport": layer_thunderforest("transport"),
    }
    
    for (name in this.layers)
      this.layers[name].shortName = name
    
    var layersArg = {
      "OpenStreetMap": this.layers["default"],
      "Satellite":     this.layers["sat"],
      "OpenCycleMap":  this.layers["cycle"],
      "Outdoors":      this.layers["outdoors"],
      "Landscape":     this.layers["landscape"],
      "Transport":     this.layers["transport"],
    }
    
    var appState = this.context.main.state
    
    var overlaysArg = {}
    
    // Add a control to switch layers.
    L.control.layers(layersArg, overlaysArg).addTo(this.map)
    
    // Add a control to show current location.
    L.control.gps().addTo(this.map)
    
    // Use OpenStreetMap as the default layer.
    this.layers[appState.mapLayer].addTo(this.map)
    
    // Set the starting location.
    this.map.setView([appState.mapLat, appState.mapLon], appState.mapZoom)
    
    // Set up event handler hooks.
    this.map.on("moveend",         this.onMoveEnd)
    this.map.on("baselayerchange", this.onBaseLayerChange)
    this.map.on("contextmenu",     this.onContextMenu)
  },
  
  onMoveEnd(e) {
    var center = e.target.getCenter()
    
    this.context.main.setState({
      mapLat:  center.lat,
      mapLon:  center.lng,
      mapZoom: e.target.getZoom()
    })
  },
  
  onBaseLayerChange(e) {
    this.context.main.setState({ mapLayer: e.layer.shortName })
  },
  
  onContextMenu(e) {
    var geohash = Geohash.encode(e.latlng.lat, e.latlng.lng, 10)
    this.openMarker(geohash)
  },
  
  openMarker(geohash) {
    var marker = this.state.markers[geohash]
    if (!marker)
      this.createMarker(geohash)
  },
  
  createMarker(geohash) {
    this.setState({ premarker: geohash })
  },
  
  saveMarker(geohash, info) {
    var pos = Geohash.decode(geohash)
    
    this.state.markers[geohash] = { lat: pos.lat, lon: pos.lon, info: info }
    this.setState({ markers: this.state.markers })
  },
  
  savePremarker(info) {
    this.saveMarker(this.state.premarker, info)
    this.clearPreMarker()
  },
  
  clearPreMarker() {
    this.setState({ premarker: null })
  },
  
  render() {
    var markers = []
    for (var geohash in this.state.markers) {
      var props = this.state.markers[geohash]
      
      markers.push(<Map.Marker key={geohash} map={this.map} {...props}>
        <Content.ExistingMarker key={geohash+":content"} {...props}/>
      </Map.Marker>)
    }
    
    if (this.state.premarker) {
      var geohash = this.state.premarker
      var pos = Geohash.decode(geohash)
      
      markers.push(<Map.Marker key={geohash} map={this.map}
                               lat={pos.lat} lon={pos.lon}
                               forceOpen={true} onLoseFocus={this.clearPreMarker}>
        <Form.CreateMarker key={geohash+":form"} onSave={this.savePremarker} />
      </Map.Marker>)
    }
    
    return (<div className="map">{markers}</div>)
  }
})

Map.Marker = React.createClass({
  componentDidMount()    { this.createMarker(this.props) },
  componentWillUnmount() { this.deleteMarker(this.props) },
  
  componentWillReceiveProps(nextProps) {
    if (this.props.map !== nextProps.map) {
      this.deleteMarker(this.props)
      this.createMarker(nextProps)
    } else {
      if (this.props.lat !== nextProps.lat) {
        this.leafletMarker.lat = nextProps.lat
        this.leafletMarker.update()
      }
      if (this.props.lon !== nextProps.lon) {
        this.leafletMarker.lon = nextProps.lon
        this.leafletMarker.update()
      }
      if (this.props.children !== nextProps.children) {
        if (!nextProps.children)
          this.leafletMarker.unbindPopup()
        else
        if (!this.props.children) {
          this.leafletMarker.bindPopup()
          this.leafletMarker.setPopupContent(this.updatePopup(nextProps.children))
        }
        else
        if (this.props.children.key !== nextProps.children.key)
          this.leafletMarker.setPopupContent(this.updatePopup(nextProps.children))
      }
      if (this.props.onLoseFocus !== nextProps.onLoseFocus) {
        if (this.props.onLoseFocus)
          this.leafletMarker.off("popupclose", this.props.onLoseFocus)
        if (nextProps.onLoseFocus)
          this.leafletMarker.on("popupclose", nextProps.onLoseFocus)
      }
    }
    
    if (nextProps.forceOpen)
      this.leafletMarker.openPopup()
  },
  
  createMarker(props) {
    this.leafletMarker = L.marker([this.props.lat, this.props.lon])
    this.leafletMarker.addTo(props.map)
    
    if (props.children) {
      this.leafletMarker.bindPopup()
      this.updatePopup(props.children)
    }
    
    if (props.forceOpen)
      this.leafletMarker.openPopup()
    
    if (props.onLoseFocus)
      this.leafletMarker.on("popupclose", props.onLoseFocus)
  },
  
  deleteMarker(props) {
    if (this.leafletMarker) {
      props.map.removeLayer(this.leafletMarker)
      this.leafletMarker = null
    }
  },
  
  updatePopup(content) {
    var contentDiv = document.createElement("div")
    React.render(React.Children.only(content), contentDiv)
    
    this.leafletMarker.setPopupContent(contentDiv)
  },
  
  render() { return null }
})

L.Control.GPS = L.Control.extend({
  options: {
    position: "topleft",
    targetText: "⌖",
    targetTitle: "Geolocation",
  },
  
  onAdd(map) {
    var div  = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar")
    var link = L.DomUtil.create("a", "leaflet-control-zoom-in", div)
    
    link.innerHTML = this.options.targetText
    link.title     = this.options.targetTitle
    link.href      = "#"
    
    var onTarget = e => {
      map.locate({ setView: true, maxZoom: 16 }) // TODO: use watch: true
    }
    
    L.DomEvent
      .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
      .on(link, 'click', L.DomEvent.stop)
      .on(link, 'click', onTarget)
      .on(link, 'click', this._refocusOnMap)
    
    var onLocationFound = e => {
      var radius = e.accuracy / 2
      
      if (this.circle && this.circle.removeFrom)
        this.circle.removeFrom(map)
      
      this.circle = L.circle(e.latlng, radius)
      this.circle.addTo(map)
    }
    
    map.on('locationfound', onLocationFound)
    
    return div
  },
})

L.control.gps = options => new L.Control.GPS(options)
