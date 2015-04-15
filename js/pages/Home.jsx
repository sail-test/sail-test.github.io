var React = require('react');
var Navbar = require('../components/Navbar.jsx');

module.exports = React.createClass({
  render: function() {
    return <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h1>Home</h1>
          </div>
        </div>
      </div>
    </div>;
  }
});
