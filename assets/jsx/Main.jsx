
var Main = React.createClass({
  getInitialState: function() { return ApplicationState.initial() },
  
  childContextTypes: { main: React.PropTypes.any.isRequired },
  getChildContext: function() { return { main: this } },
  
  render: function() {
    ApplicationState.save(this.state)
    
    return (<div id="main" style={{
      filter: this.state.invert ? "invert(100%)" : "invert(0%)",
    }}>
      <Menu />
      <Map lat="48.5" lon="-122" zoom="8" />
    </div>)
  }
})
