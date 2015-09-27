
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
