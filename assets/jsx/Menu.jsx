
var Menu = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  getInitialState: function() { return {
    drawerActive: false,
    hintActive:   false,
  }},
  
  onMouseOver: function(event) { this.setState({ drawerActive: true }) },
  onMouseOut:  function(event) { this.setState({ drawerActive: false }) },
  
  onIconEvent: function(name, e) {
    if (e.type == "click") {
      if (name == "inverse")
        this.context.main.setState({ invert: !this.context.main.state.invert })
      else
      if (name == "login")
        this.context.main.setState({ modalLogIn: true })
      else
      if (name == "logout")
        this.context.main.setState({ modalLogOut: true })
    }
    else
    if (e.type == "mouseover")
      this.setState({ hint: name, hintActive: true })
    else
    if (e.type == "mouseout")
      this.setState({ hintActive: false })
  },
  
  render: function() {
    return (<div className="menu" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      <Menu.Title texts={["F O R","A G E S"]} active={!this.state.drawerActive}/>
      {this.render_hint()}
      {this.render_drawer()}
    </div>)
  },
  
  render_drawer: function() {
    return (<div style={{ width: "100vw", display: "flex",
                          opacity: this.state.drawerActive ? 1 : 0,
                          top: this.state.drawerActive ? 0 : -100,
                          position: "absolute",
                          transition: "opacity 1.25s, top 0.5s" }}>
      <Menu.Spacer width="1em" />
      <Menu.Icon text={"☯"} name="inverse" callback={this.onIconEvent} />
      <Menu.Spacer />
      
      <Menu.Icon text={"⚝"} name="research" callback={this.onIconEvent} />
      <Menu.Spacer width="0.5em" />
      <Menu.Icon text={"⇜"} />
      <Menu.Spacer width="0.5em" />
      
      <div style={{ flex: "0 0 auto" }}>
        <Menu.Title texts={["E X P","L O R E"]} active={!this.state.hintActive}/>
      </div>
      
      <Menu.Spacer width="0.5em" />
      <Menu.Icon text={"⇝"} />
      <Menu.Spacer width="0.5em" />
      <Menu.Icon text={"⚝"} name="recollect" callback={this.onIconEvent} />
      
      <Menu.Spacer />
      {this.context.main.state.loggedIn ?
        <Menu.Icon text={"Ω"} name="logout" callback={this.onIconEvent} /> :
        <Menu.Icon text={"Å"} name="login"  callback={this.onIconEvent} />}
      <Menu.Spacer width="1em" />
    </div>)
  },
  
  render_hint: function() {
    var hint_texts = []
    if      (this.state.hint === "inverse")   hint_texts = ["I N", "V E R S E"]
    else if (this.state.hint === "research")  hint_texts = ["R E", "S E A R C H"]
    else if (this.state.hint === "recollect") hint_texts = ["R E", "C O L L E C T"]
    else if (this.state.hint === "logout")    hint_texts = ["L O G", "O U T"]
    else if (this.state.hint === "login")     hint_texts = [" L O G", "I N "]
    
    return (<div style={{ width: "100vw", display: "flex",
                          opacity: this.state.hintActive ? 1 : 0,
                          top: this.state.hintActive ? 0 : -100,
                          position: "absolute",
                          transition: "opacity 1.25s, top 0.5s" }}>
      <div style={{ flex: "1 0 auto" }}>
        <Menu.Title texts={hint_texts} active={this.state.hintActive}/>
      </div>
    </div>)
  }
})

Menu.Spacer = React.createClass({
  render: function() {
    if (this.props.width)
      return (<div style={{ flex: "0 1 "+this.props.width }}></div>)
    else // Grow to all available width (split evenly with other growing items)
      return (<div style={{ flex: "1 1 auto" }}></div>)
  }
})

Menu.Icon = React.createClass({
  callbackWrapper: function(e) {
    e.preventDefault()
    this.props.callback(this.props.name, e)
  },
  
  render: function() {
    var content = (<h2><span className="ddim">{this.props.text}</span></h2>)
    
    if (this.props.callback)
      content = (<h2>
        <a href="" onClick={this.callbackWrapper}
                   onMouseOver={this.callbackWrapper}
                   onMouseOut={this.callbackWrapper}>
          {this.props.text}
        </a>
      </h2>)
    
    return (<div style={{ flex: "0 1 auto" }}>{content}</div>)
  }
})

Menu.Title = React.createClass({
  render: function() {
    var texts = this.props.texts || []
    
    var divs = []
    var dim = true
    for (var i in texts) {
      var text = texts[i]
      if (text.length > 0) {
        var chars = texts[i].split(" ")
        for (var j in chars) {
          var key = "-" + i + "-" + j // Each child needs a unique deterministic key.
          divs.push(<h2 key={key} className={dim ? "dim" : ""}>{chars[j]}</h2>)
        }
      }
      dim = !dim
    }
    
    return (
      <div style={{ opacity: this.props.active ? 1 : 0,
                    transition: "opacity 1.25s",
                    width: "100%", display: "flex",
                    justifyContent: "center" }}>
        <div style={{ width: "12em", display: "flex",
                      justifyContent: "space-between" }}>
          {divs}
        </div>
      </div>
    )
  }
})
