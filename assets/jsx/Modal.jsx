
var Modal = {}

Modal.LogIn = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  componentDidMount() {
    $(document.body).on('keydown', this.onKeyDown)
    
    if (this.refs.username)
      this.refs.username.getDOMNode().focus()
  },
  
  componentWillUnmount() {
    $(document.body).off('keydown', this.onKeyDown)
  },
  
  onKeyDown(e) {
    if (e.key == "Escape")
      this.context.main.setState({ modalLogIn: false })
  },
  
  onLogIn(e) {
    e.preventDefault()
    
    var usernameNode = React.findDOMNode(this.refs.username)
    var passwordNode = React.findDOMNode(this.refs.password)
    
    var main = this.context.main
    
    main.refs.session.logIn(usernameNode.value, passwordNode.value, ()=> {
      // On success, hide the dialog and mark as logged in.
      main.setState({ modalLogIn: false, loggedIn: true })
    }, error => {
      // On error, reset the fields to indicate the user should try again.
      usernameNode.value = ""
      passwordNode.value = ""
    })
  },
  
  onCancel(e) {
    this.context.main.setState({ modalLogIn: false })
  },
  
  render() {
    return (<div className="modal-suspension">
      <div className="dialog-box">
        <div className="dialog-header-div">
          <h3><span className="dim">L O G</span>{" I N "}<span className="dim">?</span></h3>
        </div>
        <form onSubmit={this.onLogIn}>
          <div className="dialog-body-div">
            <input ref="username" type="text"     placeholder="U S E R N A M E" />
            <input ref="password" type="password" placeholder="P A S S W O R D" />
            <button ref="login"  type="submit" value="login">          <p>L O G I N</p></button>
            <button ref="cancel" type="button" onClick={this.onCancel}><p>C A N C E L</p></button>
          </div>
        </form>
      </div>
    </div>)
  }
})

Modal.LogOut = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  
  componentDidMount() {
    $(document.body).on('keydown', this.onKeyDown)
    
    if (this.refs.logOut)
      this.refs.logOut.getDOMNode().focus()
  },
  
  componentWillUnmount() {
    $(document.body).off('keydown', this.onKeyDown)
  },
  
  onKeyDown(e) {
    if (e.key == "Escape")
      this.context.main.setState({ modalLogOut: false })
  },
  
  onLogOut(e) {
    this.context.main.refs.session.logOut()
    this.context.main.setState({ modalLogOut: false })
  },
  
  onCancel(e) {
    this.context.main.setState({ modalLogOut: false })
  },
  
  render() {
    return (<div className="modal-suspension">
      <div className="dialog-box">
        <div className="dialog-header-div">
          <h3><span className="dim">L O G</span>{" O U T "}<span className="dim">?</span></h3>
        </div>
        <div className="dialog-body-div">
          <button type="button" ref="logOut" onClick={this.onLogOut}><p>L O G O U T</p></button>
          <button type="button" ref="cancel" onClick={this.onCancel}><p>C A N C E L</p></button>
        </div>
      </div>
    </div>)
  }
})
