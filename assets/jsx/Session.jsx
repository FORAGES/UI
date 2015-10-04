
var Session = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  getInitialState() { return {
    remotePublicDB: null,
    remoteDB:       null,
  }},
  
  componentDidMount() { this.checkIfLoggedIn() },
  
  appName()      { return "forages" },
  dbUrl(name)    { return "http://forages-db.ilvain.com:5984/" + name },
  dbCreate(name) { return new PouchDB(this.dbUrl(name), { skipSetup: true }) },
  
  checkIfLoggedIn() {
    var publicDB = this.dbCreate(this.appName() + "_public")
    publicDB.getSession().then(res => {
      // Continue only if prior session exists
      var username = res.userCtx.name
      if (!username) return
      
      // Get user info for this user.
      return publicDB.getUser(username).then(userInfo => {
        // Log in to this user's private database for this application.
        var privateDB = this.dbCreate(userInfo[this.appName()].dbname)
        return privateDB.getSession().then(res => {
          // Continue only if prior session exists and is for the same user.
          if (res.userCtx.name !== username) return
          
          // Save the database handles and mark as logged in.
          this.setState({ remotePublicDB: publicDB, remoteDB: privateDB })
          this.context.main.setState({ loggedIn: true })
        })
      })
    }).catch(error => {
      console.error(error)
    })
  },
  
  logIn(username, password, onSuccess, onError) {
    // Log in to the public database for this application.
    var publicDB = this.dbCreate(this.appName() + "_public")
    publicDB.logIn(username, password).then(user => {
      // Get user info for this user.
      return publicDB.getUser(username).then(userInfo => {
        // Log in to this user's private database for this application.
        var privateDB = this.dbCreate(userInfo[this.appName()].dbname)
        return privateDB.logIn(username, password).then(user => {
          // Save the database handles and mark as logged in.
          this.setState({ remotePublicDB: publicDB, remoteDB: privateDB })
          this.context.main.setState({ loggedIn: true })
          
          onSuccess()
        })
      })
    }).catch(error => {
      console.error(error)
      
      onError(error)
    })
  },
  
  logOut() {
    if (this.state.remotePublicDB) this.state.remotePublicDB.logOut()
    if (this.state.remoteDB)       this.state.remoteDB.logOut()
    
    this.setState({
      remotePublicDB: null,
      remoteDB:       null,
    })
    
    this.context.main.setState({ loggedIn: false })
  },
  
  render() { return null }
})
