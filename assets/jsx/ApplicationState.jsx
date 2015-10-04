
var ApplicationState = {
  defaults() {
    return {
      mode:     "explore",
      invert:   false,
      mapLat:   "48.5",
      mapLon:   "-122.0",
      mapZoom:  "8",
      mapLayer: "default",
      // Not saved to URL:
      loggedIn:    false,
      modalLogIn:  false,
      modalLogOut: false,
    }
  },
  
  initial(state) {
    var state = this.defaults()
    var param_list = window.location.search.slice(0).substring(1).split("&")
    
    for(var i in param_list) {
      var param_parts = param_list[i].split("=")
      var key   = param_parts[0]
      var value = param_parts[1]
      
      if     (key === "mode")     state.mode     = value
      else if(key === "invert")   state.invert   = value != 0
      else if(key === "mapLat")   state.mapLat   = value
      else if(key === "mapLon")   state.mapLon   = value
      else if(key === "mapZoom")  state.mapZoom  = value
      else if(key === "mapLayer") state.mapLayer = value
    }
    
    return state
  },
  
  save(state) {
    var params = {
      mode:    state.mode,
      mapLat:  state.mapLat,
      mapLon:  state.mapLon,
      mapZoom: state.mapZoom
    }
    
    if(state.invert)                params.invert   = 1
    if(state.mapLayer != "default") params.mapLayer = state.mapLayer
    
    window.history.replaceState(null, null, "?"+$.param(params))
  }
}
