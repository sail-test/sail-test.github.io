var React = require('react');
var Input = require('react-bootstrap/lib/Input');
var Alert = require('react-bootstrap/lib/Alert');
var Link = require('react-router').Link;
var firebase = require("../utils/firebase");
var Navbar = require('../components/Navbar.jsx');

var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var Auth = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      mode: "login"
    };
  },
  getInitialState: function() {
    return {
      mode: this.props.mode,
      email: '',
      password: '',
      emailError: null
    };
  },
  onEmailChange: function() {
    this.setState({
      email: this.refs.email.getValue()
    });
  },
  emailValidationState: function(){
    var length = this.state.email.length;
    if(email_regex.test(this.state.email)) {
      return 'success'; 
    } else if (length > 0) { 
      return 'error'; 
    }
  },
  onPasswordChange: function() {
    this.setState({
      password: this.refs.password.getValue()
    });
  },
  passwordValidationState: function(){
    var length = this.state.password.length;
    if (length > 3) { 
      return 'success'; 
    } else if (length > 0) { 
      return 'error'; 
    }
  },
  onSubmit: function(e){
    e.preventDefault();
    var component = this;
    if(this.emailValidationState() !== "success" || this.passwordValidationState() !== "success") {
      return;
    }
    if(this.state.mode === "login") {
      firebase.authWithPassword({
        email: component.state.email,
        password: component.state.password
      }, function(error) {
        if (error) {
          component.setState({
            emailError: "Unable to login with this email and password."
          });
          return;
        } else {
          component.context.router.transitionTo('/dashboard');
        }
      });
    } else {
      firebase.createUser({
        email: this.state.email,
        password: this.state.password
      }, function(error){
        if(error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              component.setState({
                emailError: "The new user account cannot be created because the email is already in use."
              });
              break;
            case "INVALID_EMAIL":
              component.setState({
                emailError: "The specified email is not a valid email."
              });
              break;
            default:
              component.setState({
                emailError: "Unable to create account."
              });
          };
          return;  
        } else {
          firebase.authWithPassword({
            email: component.state.email,
            password: component.state.password
          }, function(error) {
            if (error) {
              component.setState({
                emailError: "Unable to login with this email and password."
              });
              return;
            } else {
              component.context.router.transitionTo('/dashboard');
            }
          });
        }
      });
    }
  },
  render: function() {
    return <div>
      <Navbar />
      <div className="container-fluid">
        {this.state.mode === "login" ? <div className="row">
          <div className="col-xs-12">
            <h1>Login</h1>
          </div>
        </div> : <div className="row">
          <div className="col-xs-12">
            <h1>Signup</h1>
          </div>
        </div>}
        <div className="row">
          <div className="col-xs-12">
            {this.state.emailError ? <Alert bsStyle="danger" className='text-center'>{this.state.emailError}</Alert> : null}
            <form action="#" onSubmit={this.onSubmit}>
              <Input
                type='text'
                value={this.state.email}
                placeholder='Your Email Address'
                label='Email'
                bsStyle={this.emailValidationState()}
                hasFeedback
                ref='email'
                groupClassName='group-class'
                wrapperClassName='wrapper-class'
                labelClassName='label-class'
                onChange={this.onEmailChange} />
              <Input
                type='password'
                value={this.state.password}
                placeholder='Your Password'
                label='Password'
                bsStyle={this.passwordValidationState()}
                hasFeedback
                ref='password'
                groupClassName='group-class'
                wrapperClassName='wrapper-class'
                labelClassName='label-class'
                onChange={this.onPasswordChange} />
              <Input type="submit" value="submit" />
            </form>
          </div>
        </div>
        {this.state.mode === "login" ? <div className="row">
          <div className="col-xs-12">
            <Link to="/signup">Already a member?</Link>
          </div>
        </div> : <div className="row">
          <div className="col-xs-6">
            <Link to="/forgot">Forgot your password?</Link>
          </div>
          <div className="col-xs-6">
            <Link to="/login">Don't have an account?</Link>
          </div>
        </div>}
      </div>
    </div>;
  }
});

var Login = React.createClass({
  render: function() {
    return <Auth mode="login" />;
  }
});

var Signup = React.createClass({
  render: function() {
    return <Auth mode="signup" />;
  }
});

module.exports = {
  Login: Login,
  Signup: Signup
}



