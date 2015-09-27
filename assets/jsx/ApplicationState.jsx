
var ApplicationState = {
  defaults: function() {
    return {
      mode: "explore",
      invert: false,
    }
  },
  
  initial: function(state) {
    var state = this.defaults()
    var param_list = window.location.search.slice(0).substring(1).split("&")
    
    for(var i in param_list) {
      var param_parts = param_list[i].split("=")
      var key   = param_parts[0]
      var value = param_parts[1]
      
      if     (key === "mode")   state["mode"]   = value
      else if(key === "invert") state["invert"] = value != 0
    }
    
    return state
  },
  
  save: function(state) {
    var params = {
      mode: state.mode
    }
    
    if(state.invert) params["invert"] = 1
    
    window.history.replaceState(null, null, "?"+$.param(params))
  }
}
