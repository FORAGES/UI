
var Map = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  componentDidMount() {
    this.createMap()
  },
  
  getInitialState() { return {
    markers: {},
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
    var pos = Geohash.decode(geohash)
    
    this.state.markers[geohash] = { lat: pos.lat, lon: pos.lon, info: null }
    this.setState({ markers: this.state.markers })
  },
  
  render() {
    var markers = []
    for (var geohash in this.state.markers) {
      var content = (<div>New marker setup...</div>)
      var props = this.state.markers[geohash]
      markers.push(<Map.Marker key={geohash} content={content}
                               map={this.map} {...props} />)
    }
    
    return (<div className="map">{markers}</div>)
  }
})

Map.Marker = React.createClass({
  componentDidMount()    { this.createMarker(this.props) },
  componentWillUnmount() { this.removeMarker(this.props) },
  
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
      if (this.props.content !== nextProps.content) {
        if (!nextProps.content)
          this.leafletMarker.unbindPopup()
        else
        if (!this.props.content)
          this.leafletMarker.bindPopup(this.renderPopup(nextProps.content))
        else
          this.leafletMarker.setPopupContent(this.renderPopup(nextProps.content))
      }
    }
  },
  
  createMarker(props) {
    this.leafletMarker = L.marker([this.props.lat, this.props.lon])
    this.leafletMarker.addTo(props.map)
    
    if (props.content) {
      this.leafletMarker.bindPopup(this.renderPopup(props.content))
      
      // If there is no data, show the content to help the user create data.
      // TODO: remove this and use a passed-in prop instead.
      if (!props.data)
        this.leafletMarker.openPopup()
    }
  },
  
  deleteMarker(props) {
    if (this.leafletMarker) {
      props.map.removeLayer(this.leafletMarker)
      this.leafletMarker = null
    }
  },
  
  // TODO: try to find a way to use React.render here instead.
  renderPopup(content) { return React.renderToString(content) },
  
  render() { return null }
})
