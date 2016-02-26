var React = require('react');
var ReactDOM = require('react-dom');
var TripItem = require('./TripItem.jsx');
​
var TripList = React.createClass({
  // newTrip: function(e){
  //   e.preventDefault();
  //   var newTrip = {
  //     name: $('.newTrip').val()
  //   }

    //this will create a new trip
    // $('.newTrip').val('')
  
​
//   var exists = this.props.trips.reduce(function(exists, existingTrip) {
//       return exists || newTrip.name.toLowerCase() === existingTrip.name.toLowerCase();
//     }, false);
// ​
//     if(!exists){
//       this.props.addNewTrip(newTrip);
// ​
//       // intermediary setState; takes care of server-delay
//       this.props.trips.push(newTrip);
//       this.setState({trips: this.props.trips})
//     }
//   },
// ​
//   render: function() {
//     return (
//       <div>
//         <div className="trip-list">
//           {this.props.trips.map(function(trip) {
//             return (<TripItem trip={trip} />)
//           }.bind(this))}
//         </div>
// ​
//             <hr />
//         <div className="addTripList">
//           <form onSubmit={this.newTrip}>
//             <label>Add a trip</label>
//             <input className="newTrip" type="text" size="15" />
//             <input type="submit" name="AddTrip" />
//           </form>
//         </div>
//       </div>
//     );
//   }
});
​
module.exports = TripList;