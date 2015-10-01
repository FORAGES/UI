
var Main = React.createClass({
  getInitialState: function() { return ApplicationState.initial() },
  
  childContextTypes: { main: React.PropTypes.any.isRequired },
  getChildContext: function() { return { main: this } },
  
  render: function() {
    ApplicationState.save(this.state)
    
    return (<div id="main" className={this.state.invert ? "inverted" : ""}>
      <div id="main-content" className={this.state.modalBlur ? "blurred" : ""}>
        <Menu />
        <Map />
      </div>
    </div>)
  }
})
