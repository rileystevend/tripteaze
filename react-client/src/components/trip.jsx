import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

const Trip = (props) => {

  const makePublic = () => {
    props.toggleStatus(props.user, props.trip);
  }

  const deleteTrip = () => {
    console.log('delete');
    props.delete(props.user, props.trip);
  }

  if (props.editable === true) {
    return (
      <Card> 
        <CardTitle
          title = {props.trip.city}
          subtitle = {moment(props.trip.fromDate).format('MM/DD/YYYY') + ' - ' + moment(props.trip.toDate).format('MM/DD/YYYY')}
        />
        <CardText>
        {JSON.stringify(props.trip)}
        </CardText>
        <CardActions>
          <FlatButton label = 'Make Public' onClick = {makePublic} />
          <FlatButton label= 'Delete' onClick = {deleteTrip} />
        </CardActions>
      </Card>
    ); 

    // we should eventually add a pic as 'cardMedia'
  } else {
    return (
      <Card>
        <CardTitle title={props.trip.city} />
        <CardText>
          Some Trip Details Can Go here?
        </CardText>
      </Card>
    )
  }
}
 
export default Trip;