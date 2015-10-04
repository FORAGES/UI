
var Session = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  getInitialState() { return {
    remoteDB: null,
  }},
  
  dbUrl(name)    { return "http://forages-db.ilvain.com:5984/" + name },
  dbCreate(name) { return new PouchDB(this.dbUrl(name), { skipSetup: true }) },
  
  logIn(username, password, onSuccess, onError) {
    var appName = "forages"
    
    // Log in to central _users database.
    var usersDB = this.dbCreate("_users")
    usersDB.login(username, password).then(user => {
      // Get user info for this user from the _users database.
      return usersDB.get("org.couchdb.user:" + username).then(userInfo => {
        // Log in to this user's private database for this application.
        var privateDB = this.dbCreate(userInfo[appName].dbname)
        return privateDB.login(username, password).then(user => {
          // Save the database handle and mark as logged in.
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
    if (this.state.remoteDB)
      this.state.remoteDB.logout()
    
    this.context.main.setState({ loggedIn: false })
  },
  
  render() { return null }
})
