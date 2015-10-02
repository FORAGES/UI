
var Main = React.createClass({
  getInitialState: function() { return ApplicationState.initial() },
  
  childContextTypes: { main: React.PropTypes.any.isRequired },
  getChildContext: function() { return { main: this } },
  
  render: function() {
    ApplicationState.save(this.state)
    
    var modal = null
    if      (this.state.modalLogIn)  modal = <Modal.LogIn/>
    else if (this.state.modalLogOut) modal = <Modal.LogOut/>
    
    return (<div id="main" className={this.state.invert ? "inverted" : ""}>
      <div id="main-content" className={modal ? "blurred" : ""}>
        <Menu />
        <Map />
      </div>
      {modal}
    </div>)
  }
})
