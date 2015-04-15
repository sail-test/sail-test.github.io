var firebase = require("../utils/firebase");

module.exports = {
  componentWillMount: function() {
    firebase.onAuth(this.authChange);
    this.setState({
      auth: firebase.getAuth()
    });
  },
  componentWillUnmount: function() {
    firebase.offAuth(this.authChange);
  },
  authChange: function(auth){
    this.setState({
      auth: auth
    });    
  }
};