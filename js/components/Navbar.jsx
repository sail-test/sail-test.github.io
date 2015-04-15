var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var Link = require('react-router').Link;
var AuthMixin = require("../mixins/Auth");
var ScrollLockMixin = require("../mixins/ScrollLock");
var firebase = require("../utils/firebase");

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [AuthMixin, ScrollLockMixin],
  getInitialState: function() {
    return {
      flyout: false
    };
  },
  flyout: function(e){
    e.preventDefault();
    this.scrollLock();
    this.setState({
      flyout: true
    });
  },
  flyin: function(){
    if(this.state.flyout) {
      this.scrollRelease();
      this.setState({
        flyout: false
      });      
    }
  },
  logout: function(e){
    e.preventDefault();
    firebase.unauth();
  },
  render: function() {
    return <div className="navbar-hold hidden-print">
      <div className={"flyout visible-xs" + (this.state.flyout ? " open" : "")}>
        {this.state.auth ? <div>
          <a href="#" onTouchStart={this.logout} onClick={this.logout} className="auth">Log Out</a>       
        </div> : <div>
          <a href="#" onTouchStart={this.login} onClick={this.login} className="auth">Log In</a> 
        </div>} 
      </div>
      {this.state.flyout ? <div className="flyout-backdrop" onTouchStart={this.flyin} onClick={this.flyin} /> : null}
      <Navbar className="navbar-static-top visible-xs" fluid id="mobile-navbar">
        <a href="#" className="hamburger" onTouchStart={this.flyout} onClick={this.flyout} />
      </Navbar>
      <Navbar brand='Sail Test' fluid fixedTop className="hidden-xs" id="desktop-navbar">
        <Nav>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/forecasts">Forecasts</Link></li>
        </Nav>
        {this.state.auth ? <Nav right>
          <NavItem onClick={this.logout}>Logout</NavItem>
        </Nav> : <Nav right>
          <li><Link to="/login">Log In</Link></li>
        </Nav>}
      </Navbar>
    </div>;
  }
});


      