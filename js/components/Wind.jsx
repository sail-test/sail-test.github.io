var React = require('react');
var Map = require('../components/Map.jsx');
var Link = require('react-router').Link;
var Navbar = require('../components/Navbar.jsx');

module.exports = React.createClass({
  render: function() {
    return <div className="wind-page">
      <Navbar />
      <Map {...this.props} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="visible-print">{this.props.title}</h1>
            <ol className="breadcrumb">
              <li><Link to="/forecasts">Forecasts</Link></li>
              <li className="active">{this.props.title}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>;
  }
});
