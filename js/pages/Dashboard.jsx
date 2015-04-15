var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var firebase = require("../utils/firebase");
var Navbar = require('../components/Navbar.jsx');
var AuthMixin = require("../mixins/Auth");

module.exports = React.createClass({
  mixins: [AuthMixin],
  checkout: function(){
    var handler = StripeCheckout.configure({
      key: 'pk_test_yozBVmnQrILPFDfogSHA4RBl',
      token: function(token) {
        firebase.child("subscription-queue").push({
          id: "sample_id",
          token: token.id
        });
      }
    });
    handler.open({
      name: 'Sail Test',
      description: 'Pro Subscription ($29 per month)',
      panelLabel: "Subscribe",
      label: "Subscribe",
      amount: 2000,
      allowRememberMe: false,
      email: this.state.auth.password.email
    });
  },
  render: function() {
    return <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h1>Dashboard</h1>
            <Button onClick={this.checkout}>Checkout</Button>
          </div>
        </div>
      </div>
    </div>;
  }
});

