import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

let Activity = (props) => {
  let cardStyle = {};
  if (props.sidebar) {
    cardStyle = { textAlign: 'left'};
  } else {
    cardStyle = { textAlign: 'left', width: '300px' };
  }
  
  if (props.type === 'event') {
    return (
      <Card style={cardStyle}> 
        <CardHeader title = {props.activity.name} subtitle = 'Event' />
        <CardMedia src = {props.activity.logo} alt =''>
        </CardMedia>
        <CardText>
          We don't save much detail rn
          {props.activity.date}?
          {props.activity.details}?
        </CardText>
      </Card>
    );

  } else {  //is eatin
    return (
      <Card style={cardStyle}>
        <CardHeader title={props.activity.name} subtitle='Food' />
        <CardMedia src={props.activity.logo} alt=''>
        </CardMedia>
        <CardText>
          We don't save much detail rn
          {props.activity.address}?
          {props.activity.details}?
        </CardText>
      </Card>
    );
  }
}

export default Activity;