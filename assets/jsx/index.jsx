
var Menu = React.createClass({
  getInitialState: function() { return {
    menuActive: false
  }},
  
  onMouseOver: function(event) { this.setState({ menuActive: true }) },
  onMouseOut:  function(event) { this.setState({ menuActive: false }) },
  
  render: function() {
    return (<div className="menu" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      <div style={{ opacity: this.state.menuActive ? 0 : 1,
                    transition: "opacity 1.25s" }}>
        <Title />
      </div>
      <div style={{ opacity: this.state.menuActive ? 1 : 0,
                    top: this.state.menuActive ? 0 : -100,
                    position: "absolute",
                    transition: "opacity 1.25s, top 0.5s" }}>
        <MenuDrawer  />
      </div>
    </div>)
  }
})

var Title = React.createClass({
  render: function() {
    return (<div className="title">
      <h1>
        <span className="dim">F O R</span>{" "} A G E S
      </h1>
    </div>)
  }
})

var MenuDrawer = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  onClickInvert: function(e) {
    this.context.main.setState({ invert: !this.context.main.state.invert })
  },
  
  onClickLeftward: function(e) {
    this.context.main.setState({ invert: !this.context.main.state.invert })
  },
  
  onClickRightward: function(e) {
    this.context.main.setState({ invert: !this.context.main.state.invert })
  },
  
  render: function() {
    return (<div style={{ width: "100vw" }}>
      <div style={{ position: "absolute", top: 0, left: 20 }}>
        <h1><a href="javascript:void(0)" onClick={this.onClickInvert}>{"☯"}</a></h1>
      </div>
      <h1>
        <a href="javascript:void(0)" onClick={this.onClickLeftward}>{"⚝"}</a>
        <span className="ddim">{" ⇜ "}</span>
        <span className="dim">E X P</span>{" "} L O R E
        <span className="ddim">{" ⇝ "}</span>
        <a href="javascript:void(0)" onClick={this.onClickRightward}>{"⚝"}</a>
      </h1>
    </div>)
  }
})

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

var Main = React.createClass({
  getInitialState: function() {
    var defaults = {
      mode: "explore",
      invert: false,
    }
    return this.loadStateFromUrl(defaults)
  },
  
  componentDidMount: function() { this.loadStateFromUrl() },
  
  childContextTypes: { main: React.PropTypes.any.isRequired },
  getChildContext: function() { return { main: this } },
  
  saveStateToUrl: function() {
    var params = {
      mode: this.state.mode
    }
    
    if(this.state.invert) params["invert"] = 1
    
    window.history.replaceState(null, null, "?"+$.param(params))
  },
  
  loadStateFromUrl: function(newState) {
    var param_list = window.location.search.slice(0).substring(1).split("&")
    console.log(window.location.search)
    console.log(param_list)
    for(var i in param_list) {
      var param_parts = param_list[i].split("=")
      var key   = param_parts[0]
      var value = param_parts[1]
      
      if     (key === "mode")   newState["mode"]   = value
      else if(key === "invert") newState["invert"] = value != 0
    }
    
    console.log(newState)
    return newState
  },
  
  render: function() {
    this.saveStateToUrl()
    
    return (<div id="main" style={{
      filter: this.state.invert ? "invert(100%)" : "invert(0%)",
    }}>
      <Menu />
      <Map lat="48.5" lon="-122" zoom="8" />
    </div>)
  }
})

React.render(<Main />, document.getElementById('wrapper'))
