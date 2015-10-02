
var Modal = {}

Modal.LogIn = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  onLogIn: function(e) {
    e.preventDefault()
    
    var username = React.findDOMNode(this.refs.username).value
    var password = React.findDOMNode(this.refs.password).value
    
    // TODO: log in with username and password
    
    this.context.main.setState({ modalLogIn: false, loggedIn: true })
  },
  
  onCancel: function(e) {
    this.context.main.setState({ modalLogIn: false })
  },
  
  render: function() {
    return (<div className="modal-suspension">
      <div className="dialog-box">
        <div className="dialog-header-div">
          <h3><span className="dim">L O G</span>{" I N "}<span className="dim">?</span></h3>
        </div>
        <form onSubmit={this.onLogIn}>
          <div className="dialog-body-div">
            <input ref="username" type="text"     placeholder="U S E R N A M E" />
            <input ref="password" type="password" placeholder="P A S S W O R D" />
            <button type="submit" value="login">          <p>L O G I N</p></button>
            <button type="button" onClick={this.onCancel}><p>C A N C E L</p></button>
          </div>
        </form>
      </div>
    </div>)
  }
})

Modal.LogOut = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  onLogOut: function(e) {
    this.context.main.setState({ modalLogOut: false, loggedIn: false })
  },
  
  onCancel: function(e) {
    this.context.main.setState({ modalLogOut: false })
  },
  
  render: function() {
    return (<div className="modal-suspension">
      <div className="dialog-box">
        <div className="dialog-header-div">
          <h3><span className="dim">L O G</span>{" O U T "}<span className="dim">?</span></h3>
        </div>
        <div className="dialog-body-div">
          <button type="button" onClick={this.onLogOut}><p>L O G O U T</p></button>
          <button type="button" onClick={this.onCancel}><p>C A N C E L</p></button>
        </div>
      </div>
    </div>)
  }
})
