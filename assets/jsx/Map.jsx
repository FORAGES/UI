
var Map = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  componentDidMount() {
    this.createMap()
  },
  
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
    this.map.on('moveend',         this.onMoveEnd)
    this.map.on('baselayerchange', this.onBaseLayerChange)
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
  
  render() {
    return (<div className="map"></div>)
  }
})
