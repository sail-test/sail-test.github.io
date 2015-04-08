var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Home = require('./pages/Home.jsx');

var App = React.createClass({
  render: function () {
    return <div>
      <RouteHandler/>
    </div>;
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('react'));
});