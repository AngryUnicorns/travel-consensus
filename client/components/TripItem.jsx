var React = require('react');
var ReactDOM = require('react-dom');

var TripItem = React.createClass({
	clickHandle: function() {
		console.log('seeing if Trip Items works')
		window.globalStateTripId = this.props.trip.id;
	},

	render: function() {
		return (
		  <div className="trip-item" onClick={this.clickHandle}>
		  		<p>{this.props.trip.name}</p>
		  </div>
	  )
	}
})

module.exports = TripItem;