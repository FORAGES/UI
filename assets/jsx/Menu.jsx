
const Menu = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  getInitialState() { return {
    drawerActive: false,
    hintActive:   false,
  }},
  
  onMouseOver(event) { this.setState({ drawerActive: true }) },
  onMouseOut(event) { this.setState({ drawerActive: false }) },
  
  onIconEvent(name, e) {
    if (e.type == "click") {
      if (name == "inverse")
        this.context.main.setState({ invert: !this.context.main.state.invert })
      else
      if (name == "login")
        this.context.main.setState({ modalLogIn: true })
      else
      if (name == "logout")
        this.context.main.setState({ modalLogOut: true })
      else
      if (name == this.state.hint)
        this.context.main.setState({ mode: name })
    }
    else
    if (e.type == "mouseover")
      this.setState({ hint: name, hintActive: true })
    else
    if (e.type == "mouseout")
      this.setState({ hintActive: false })
  },
  
  titleMap: {
    forages:   ["F O R", "A G E S"],
    explore:   ["E X P", "L O R E"],
    research:  ["R E", "S E A R C H"],
    recollect: ["R E", "C O L L E C T"],
    inverse:   ["I N", "V E R S E"],
    logout:    ["L O G", "O U T"],
    login:     [" L O G", "I N "], // extra spaces because of fewer letters.
  },
  
  prevModeMap: {
    explore:   "research",
    recollect: "explore",
    research:  "recollect",
  },
  
  nextModeMap: {
    explore:   "recollect",
    recollect: "research",
    research:  "explore",
  },
  
  render() {
    return (<div className="menu" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      <Menu.Title texts={this.titleMap.forages}
                  active={!this.state.drawerActive}/>
      {this.render_hint()}
      {this.render_drawer()}
    </div>)
  },
  
  render_drawer() {
    const mode = this.context.main.state.mode
    const prevMode = this.prevModeMap[mode]
    const nextMode = this.nextModeMap[mode]
    
    return (<div style={{ width: "100vw", display: "flex",
                          opacity: this.state.drawerActive ? 1 : 0,
                          top: this.state.drawerActive ? 0 : -100,
                          position: "absolute",
                          transition: "opacity 1.25s, top 0.5s" }}>
      <Menu.Spacer width="1em" />
      <Menu.Icon text={"☯"} name="inverse" callback={this.onIconEvent} />
      <Menu.Spacer />
      
      <Menu.Icon text={"⚝"} name={nextMode} callback={this.onIconEvent} />
      <Menu.Spacer width="0.5em" />
      <Menu.Icon text={"⇜"} />
      <Menu.Spacer width="0.5em" />
      
      <div style={{ flex: "0 0 auto" }}>
        <Menu.Title texts={this.titleMap[mode]}
                    active={!this.state.hintActive}/>
      </div>
      
      <Menu.Spacer width="0.5em" />
      <Menu.Icon text={"⇝"} />
      <Menu.Spacer width="0.5em" />
      <Menu.Icon text={"⚝"} name={prevMode} callback={this.onIconEvent} />
      
      <Menu.Spacer />
      {this.context.main.state.loggedIn ?
        <Menu.Icon text={"Ω"} name="logout" callback={this.onIconEvent} /> :
        <Menu.Icon text={"Å"} name="login"  callback={this.onIconEvent} />}
      <Menu.Spacer width="1em" />
    </div>)
  },
  
  render_hint() {
    return (<div style={{ width: "100vw", display: "flex",
                          opacity: this.state.hintActive ? 1 : 0,
                          top: this.state.hintActive ? 0 : -100,
                          position: "absolute",
                          transition: "opacity 1.25s, top 0.5s" }}>
      <div style={{ flex: "1 0 auto" }}>
        <Menu.Title texts={this.titleMap[this.state.hint]}
                    active={this.state.hintActive}/>
      </div>
    </div>)
  }
})

Menu.Spacer = React.createClass({
  render() {
    if (this.props.width)
      return (<div style={{ flex: "0 1 "+this.props.width }}></div>)
    else // Grow to all available width (split evenly with other growing items)
      return (<div style={{ flex: "1 1 auto" }}></div>)
  }
})

Menu.Icon = React.createClass({
  callbackWrapper(e) {
    e.preventDefault()
    this.props.callback(this.props.name, e)
  },
  
  render() {
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
  render() {
    const texts = this.props.texts || []
    
    const divs = []
    var dim = true
    for (const i in texts) {
      const text = texts[i]
      if (text.length > 0) {
        const chars = texts[i].split(" ")
        for (const j in chars) {
          const key = "-" + i + "-" + j // Each child needs a unique deterministic key.
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
