
var Main = React.createClass({
  getInitialState: function() {
    var defaults = {
      mode: "explore",
      invert: false,
    }
    return this.loadStateFromUrl(defaults)
  },
  
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
    
    for(var i in param_list) {
      var param_parts = param_list[i].split("=")
      var key   = param_parts[0]
      var value = param_parts[1]
      
      if     (key === "mode")   newState["mode"]   = value
      else if(key === "invert") newState["invert"] = value != 0
    }
    
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
