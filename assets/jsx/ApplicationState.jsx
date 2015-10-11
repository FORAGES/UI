
const ApplicationState = {
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
  
  initial() {
    const state = this.defaults()
    const param_list = window.location.search.slice(0).substring(1).split("&")
    
    for(const i in param_list) {
      const param_parts = param_list[i].split("=")
      const key   = decodeURIComponent(param_parts[0])
      const value = decodeURIComponent(param_parts[1])
      
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
    const params = {
      mode:    state.mode,
      mapLat:  state.mapLat,
      mapLon:  state.mapLon,
      mapZoom: state.mapZoom
    }
    
    if(state.invert)                params.invert   = 1
    if(state.mapLayer != "default") params.mapLayer = state.mapLayer
    
    const queryParams = [];
    for (const key in params)
      queryParams.push(encodeURIComponent(key) +
                 "=" + encodeURIComponent(params[key]))
    
    window.history.replaceState(null, null, "?" + queryParams.join("&"))
  }
}
