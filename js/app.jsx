var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var Home = require('./pages/Home.jsx');
var Forecasts = require('./pages/Forecasts.jsx');
var Auth = require('./pages/Auth.jsx');
var SanFrancisco = require('./pages/SanFrancisco.jsx');

React.initializeTouchEvents(true);

var App = React.createClass({
  render: function () {
    return <RouteHandler/>;
  }
});

var routes = <Route handler={App} path="/">
  <DefaultRoute handler={Home}/>
  <Route name="forecasts" handler={Forecasts} />
  <Route name="login" handler={Auth.Login} />
  <Route name="signup" handler={Auth.Signup} />
  <Route name="san-francisco/central-bay-tide" handler={SanFrancisco.CentralBayTide} />
  <Route name="san-francisco/central-bay-wind" handler={SanFrancisco.CentralBayWind} />
  <Route name="san-francisco/san-francisco-bay-wind" handler={SanFrancisco.SanFranciscoBayWind} />
</Route>;

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('react'));
});