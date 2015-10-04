
var Main = React.createClass({
  getInitialState() { return ApplicationState.initial() },
  
  childContextTypes: { main: React.PropTypes.any.isRequired },
  getChildContext() { return { main: this } },
  
  render() {
    ApplicationState.save(this.state)
    
    var modal = null
    if      (this.state.modalLogIn)  modal = <Modal.LogIn/>
    else if (this.state.modalLogOut) modal = <Modal.LogOut/>
    
    return (<div id="main" className={this.state.invert ? "inverted" : ""}>
      <Session ref="session" />
      <div id="main-content" className={modal ? "blurred" : ""}>
        <Menu />
        <Map />
      </div>
      {modal}
    </div>)
  }
})
