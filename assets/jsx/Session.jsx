
const Session = {
  init(main) {
    this.main = main
    this.createLocalDB()
    this.checkIfLoggedIn()
  },
  
  appName()      { return "forages" },
  dbUrl(name)    { return "http://forages-db.ilvain.com:5984/" + name },
  dbRemote(name) { return new PouchDB(this.dbUrl(name), { skipSetup: true }) },
  dbLocal(name)  { return new PouchDB(name,             { skipSetup: true }) },
  
  createLocalDB() {
    const db = this.dbLocal(this.appName())
    this.localDB = db
    
    db.info().catch(error => {
      console.error(error)
    })
  },
  
  checkIfLoggedIn() {
    const publicDB = this.dbRemote(this.appName() + "_public")
    publicDB.getSession().then(res => {
      // Continue only if prior session exists
      const username = res.userCtx.name
      if (!username) return
      
      // Get user info for this user.
      return publicDB.getUser(username).then(userInfo => {
        // Log in to this user's private database for this application.
        const privateDB = this.dbRemote(userInfo[this.appName()].dbname)
        return privateDB.getSession().then(res => {
          // Continue only if prior session exists and is for the same user.
          if (res.userCtx.name !== username) return
          
          // Save the database handles and mark as logged in.
          this.remoteDB       = privateDB
          this.remotePublicDB = publicDB
          this.main.setState({ loggedIn: true })
        })
      })
    }).catch(error => {
      console.error(error)
    })
  },
  
  logIn(username, password, onSuccess, onError) {
    // Log in to the public database for this application.
    const publicDB = this.dbRemote(this.appName() + "_public")
    publicDB.logIn(username, password).then(user => {
      // Get user info for this user.
      return publicDB.getUser(username).then(userInfo => {
        // Log in to this user's private database for this application.
        const privateDB = this.dbRemote(userInfo[this.appName()].dbname)
        return privateDB.logIn(username, password).then(user => {
          // Save the database handles and mark as logged in.
          this.remoteDB       = privateDB
          this.remotePublicDB = publicDB
          this.main.setState({ loggedIn: true })
          
          onSuccess()
        })
      })
    }).catch(error => {
      console.error(error)
      
      onError(error)
    })
  },
  
  logOut() {
    if (this.remotePublicDB) this.remotePublicDB.logOut()
    if (this.remoteDB)       this.remoteDB.logOut()
    
    this.remotePublicDB = null
    this.remoteDB       = null
    this.main.setState({ loggedIn: false })
  },
}
