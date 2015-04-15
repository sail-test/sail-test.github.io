var React = require('react');
var Tide = require('../components/Tide.jsx');
var Wind = require('../components/Tide.jsx');
var moment = require("moment");

var CentralBayTide = React.createClass({
  render: function() {
    return <Tide 
      title="Central Bay Tide"
      maxBounds={[[37.7463, -122.635], [37.939, -122.29]]}
      center={[37.846, -122.454]}
      minZoom={12}
      maxZoom={14}
      zoom={13}
      layers="sf-forecast-1:sf-tidal-current-200m-1"
      yra_layers="sf-forecast-1:yra_marks"
      yra_styles="yra_marks_3"
      start={moment().add(2, 'days')}
      end={moment().add(4, 'days')}
    />;
  }
});

var CentralBayWind = React.createClass({
  render: function() {
    return <Wind 
      title="Central Bay Wind"
      maxBounds={[[37.7531, -122.604], [37.9361, -122.3]]}
      center={[37.9394, -122.305]}
      minZoom={12}
      maxZoom={14}
      zoom={12}
      layers="sf-forecast-1:sf-morning-of-1"
      yra_layers="sf-forecast-1:yra_marks"
      yra_styles="yra_marks_3"
      start={moment().subtract(7, 'days')}
      end={moment().add(1, 'days')}
    />;
  }
});

var SanFranciscoBayWind = React.createClass({
  render: function() {
    return <Wind 
      title="San Francisco Bay Wind Outlook"
      maxBounds={[[37.5754, -123.002], [38.1513, -122.16]]}
      center={[37.8546, -122.408]}
      minZoom={11}
      maxZoom={12}
      zoom={11}
      layers="sf-forecast-1:sf-12hr-ahead-1"
      yra_layers="sf-forecast-1:yra_marks"
      yra_styles="yra_marks_3"
      start={moment().subtract(7, 'days')}
      end={moment().add(1, 'days')}
    />;
  }
});

module.exports = {
  CentralBayTide: CentralBayTide,
  CentralBayWind: CentralBayWind,
  SanFranciscoBayWind: SanFranciscoBayWind
};