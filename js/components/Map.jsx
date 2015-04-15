var React = require('react');
var Map = require("react-leaflet").Map;
var WMSTileLayer = require("react-leaflet").WMSTileLayer;
var Input = require('react-bootstrap/lib/Input');
var moment = require("moment");

module.exports = React.createClass({
  getInitialState: function() {
    return {
      date: moment(this.props.start).hour(8).minute(0).second(0).millisecond(0)
    };
  },
  setDate: function(e) {
    var date = moment(new Date(parseInt(e.target.value, 10)));
    this.setState({
      date: date
    });
    this.refs.wms_layer.leafletElement.setParams({
      time: date.add(180, "minutes").toISOString()
    });
  },
  render: function() {
    var time_selector = null;
    if(this.props.start && this.props.end && this.props.start.toDate() < this.props.end.toDate()){
      var options = [];
      var current = moment(this.props.start).hour(8).minute(0).second(0).millisecond(0);
      while(current.diff(this.props.end) < 0) {
        options.push(<option key={current.valueOf()} value={current.valueOf()}>{current.calendar()}</option>);
        current.add(30, "minutes");
        if(current.hour() > 20) {
          current.add(1, "day").hour(8);
        }
      }
      time_selector = <Input type='select' placeholder='select' className="hidden-print" onChange={this.setDate}>{options}</Input>;
    }
    return <Map center={this.props.center} zoom={this.props.zoom} maxZoom={this.props.maxZoom} minZoom={this.props.minZoom} maxBounds={this.props.maxBounds}>
      {time_selector}
      <WMSTileLayer
        ref="wms_layer"
        url="http://www.sailtactics.com:8080/geowebcache/service/wms" 
        layers={this.props.layers}
        styles=''
        format="image/png"
        time={this.state.date.subtract(moment().utcOffset(), "minutes").toISOString()}
        transparent={true}
        z={9999}
      />
      <WMSTileLayer
        url="http://www.sailtactics.com:8080/geowebcache/service/wms" 
        layers={this.props.yra_layers}
        styles={this.props.yra_styles}
        format="image/png"
        transparent={true}
        z={9999}
      />
    </Map>;
  }
});

