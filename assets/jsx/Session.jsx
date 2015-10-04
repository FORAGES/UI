
var Session = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  getInitialState() { return {
    remotePublicDB: null,
    remoteDB:       null,
  }},
  
  dbUrl(name)    { return "http://forages-db.ilvain.com:5984/" + name },
  dbCreate(name) { return new PouchDB(this.dbUrl(name), { skipSetup: true }) },
  
  logIn(username, password, onSuccess, onError) {
    var appName = "forages"
    
    // Log in to the public database for this application.
    var publicDB = this.dbCreate(appName + "_public")
    publicDB.logIn(username, password).then(user => {
      // Save the public database handle.
      this.setState({ remotePublicDB: publicDB })
      
      // Get user info for this user.
      return publicDB.getUser(username).then(userInfo => {
        // Log in to this user's private database for this application.
        var privateDB = this.dbCreate(userInfo[appName].dbname)
        return privateDB.logIn(username, password).then(user => {
          // Save the private database handle and mark as logged in.
          this.setState({ remoteDB: privateDB })
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
