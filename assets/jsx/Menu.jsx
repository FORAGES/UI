
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
