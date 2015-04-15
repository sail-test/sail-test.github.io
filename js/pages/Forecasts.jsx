var React = require('react');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
var Link = require('react-router').Link;
var Navbar = require('../components/Navbar.jsx');

module.exports = React.createClass({
  render: function() {
    return <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h1>Forecasts</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2>Wind</h2>
            <ListGroup>
              <ListGroupItem><Link to="/san-francisco/san-francisco-bay-wind">San Francisco Bay</Link></ListGroupItem>
              <ListGroupItem><Link to="/san-francisco/central-bay-wind">Central Bay</Link></ListGroupItem>
            </ListGroup>
          </div>
          <div className="col-sm-6">
            <h2>Tides</h2>
            <ListGroup>
              <ListGroupItem><Link to="/san-francisco/central-bay-tide">Central Bay</Link></ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>;
  }
});
