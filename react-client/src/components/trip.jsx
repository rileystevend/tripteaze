import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const Trip = (props) => {

  const makePublic = () => {
    props.toggleStatus(props.user, props.trip);
  }

  const deleteTrip = () => {
    props.delete(props.user, props.trip);
  } 

  if (props.editable === true) {
    return (
      <Paper> <h3> {props.trip.city} </h3>
      <RaisedButton label = 'Make Public' onClick = {makePublic} />
      <RaisedButton label= 'Delete' onClick = {deleteTrip} />
      </Paper>
    ); 
  } else {
    return (
      <Paper> <h3> {props.trip.city} </h3> </Paper>
    )
  }
}
 
export default Trip;