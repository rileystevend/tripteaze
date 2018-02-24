import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const Trip = (props) => {

  const makePublic = () => {
    console.log('make it public');
  }

  const deleteTrip = () => {
    console.log('delete my trip');
  }

  return (
    <Paper> <h3> {props.trip.city} </h3>
    <RaisedButton label = 'Make Public' onClick = {makePublic} />
    <RaisedButton label= 'Delete' onClick={deleteTrip} />
    </Paper>
  );
}
 
export default Trip;