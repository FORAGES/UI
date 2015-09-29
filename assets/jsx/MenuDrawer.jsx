
var MenuDrawer = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  onClickInvert: function(e) {
    this.context.main.setState({ invert: !this.context.main.state.invert })
    e.preventDefault()
  },
  
  onClickLeftward: function(e) {
    this.context.main.setState({ invert: !this.context.main.state.invert })
    e.preventDefault()
  },
  
  onClickRightward: function(e) {
    this.context.main.setState({ invert: !this.context.main.state.invert })
    e.preventDefault()
  },
  
  render: function() {
    return (<div style={{ width: "100vw" }}>
      <div style={{ position: "absolute", top: 0, left: 20 }}>
        <h2><a href="" onClick={this.onClickInvert}>{"☯"}</a></h2>
      </div>
      <h2>
        <a href="" onClick={this.onClickLeftward}>{"⚝"}</a>
        <span className="ddim">{" ⇜ "}</span>
        <span className="dim">E X P</span>{" "} L O R E
        <span className="ddim">{" ⇝ "}</span>
        <a href="" onClick={this.onClickRightward}>{"⚝"}</a>
      </h2>
      <div style={{ position: "absolute", top: 0, right: 20 }}>
        <h2><a href="" onClick={this.onClickInvert}>{"Ω"}</a></h2>
      </div>
    </div>)
  }
})
