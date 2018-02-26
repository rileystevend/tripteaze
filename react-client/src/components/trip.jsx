import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const Trip = (props) => {

  const makePublic = () => {
    console.log('make it public');
    props.toggleStatus(props.username, props.trip);
  }

  const deleteTrip = () => {
    console.log('delete my trip');
    props.delete(props.username, props.trip);
  }

  if (props.editable === true) {
    return (
      <Paper> <h3> {props.trip.city} </h3>
      <RaisedButton label = 'Make Public' onClick = {makePublic} />
      <RaisedButton label= 'Delete' onClick = {deleteTrip} />
      </Paper>
    ); 
  } else {
    <Paper> <h3> {props.trip.city} </h3> </Paper>
  }
}
 
export default Trip;