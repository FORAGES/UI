
var Session = React.createClass({
  contextTypes: { main: React.PropTypes.any.isRequired },
  getInitialState: function() { return {
    remoteDB: null,
  }},
  
  logIn: function(username, password, onSuccess, onError) {
    var dbUrl = "http://forages-db.ilvain.com:5984/" + username
    var db = new PouchDB(dbUrl, { skipSetup: true })
    
    db.login(username, password).then(function (user) {
      this.setState({ remoteDB: db })
      this.context.main.setState({ loggedIn: true })
      
      onSuccess()
    }.bind(this)).catch(function (error) {
      console.error(error)
      
      onError(error)
    })
  },
  
  logOut: function() {
    if (this.state.remoteDB)
      this.state.remoteDB.logout()
    
    this.context.main.setState({ loggedIn: false })
  },
  
  render: function() { return null }
})
