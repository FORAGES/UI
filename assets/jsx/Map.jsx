
var Map = React.createClass({
  componentDidMount: function () {
    this.createMap()
  },
  
  createMap: function (element) {
    this.map = L.map(this.getDOMNode(), { doubleClickZoom: false })
    
    var layer_osm = function (name) {
      return L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      })
    }
    
    var layer_thunderforest = function (name) {
      return L.tileLayer('http://{s}.tile.thunderforest.com/'+name+'/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    }
    
    var layer_mapquest_sat = function (name) {
      return L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
        type: 'sat',
        ext: 'jpg',
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
        subdomains: '1234'
      })
    }
    
    var layers = {
      "OpenStreetMap": layer_osm(),
      "Satellite":     layer_mapquest_sat(),
      "OpenCycleMap":  layer_thunderforest("cycle"),
      "Outdoors":      layer_thunderforest("outdoors"),
      "Landscape":     layer_thunderforest("landscape"),
      "Transport":     layer_thunderforest("transport"),
      "TransportDark": layer_thunderforest("transport-dark"),
    }
    
    var overlays = {}
    
    // Add a control to switch layers.
    L.control.layers(layers, overlays).addTo(this.map)
    
    // Use OpenStreetMap as the default layer.
    layers["OpenStreetMap"].addTo(this.map)
    
    // Set the starting location.
    this.map.setView([this.props.lat, this.props.lon], this.props.zoom)
  },
  
  render: function () {
    return (<div className="map"></div>)
  }
})
