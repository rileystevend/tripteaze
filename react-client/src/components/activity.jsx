import React from 'react';

import moment from 'moment';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/';
import { cyan50, cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900 } from 'material-ui/styles/colors';


//onClick={() => props.deleteEvent(event,props.user,props.city)}

export const styles = {
  anchor: {
    color: cyan700,
    textDecoration: 'none'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '0 !important'
  },
  cardSubtitle: {
    color: cyan500,
    fontSize: 12
  }
}

let Activity = (props) => {
  let cardStyle = {};
  if (props.sidebar) {
    cardStyle = { textAlign: 'left', margin: '5px'};
  } else {
    cardStyle = {
      textAlign: 'left',
      width: '45%',
      margin: '0 2% 3% 2%',
    };
  }

  // Remove buttons should only appear on a user's trips page
  let showRemoveButton = () => {
    if (props.user) {
      return (
        <CardActions>
          <FlatButton onClick={() => props.delete(props.activity, props.user, props.city)} label='Remove' />
        </CardActions>
      )
    }
  }

  // Converts price to dollar signs for restaurants
  let calcDollarSigns = (price) => {
    let dollarSigns = '';
    for (var i = 0; i < price; i++) {
      dollarSigns += '$';
    }
    return dollarSigns;
  }

  // Renders activities shown on page
  if (props.type === 'event') {
    return (
      <Card style={cardStyle}> 
        <CardMedia>
          <img src={props.activity.logo} alt =''/>
        </CardMedia>
        
        <CardTitle
          title = {
            <a
              href={props.activity.url}
              target='_blank'
              style={styles.anchor}
            >{props.activity.name}</a>
          }
          // subtitle = {moment(props.activity.start_time).format('MM/DD/YY')}
          titleStyle = {styles.cardTitle}
          subtitleStyle = {styles.cardSubtitle}
        />

        <CardText>

          {`${moment(props.activity.start_time).format('MM/DD/YY hh:mm A')} - ${moment(props.activity.end_time).format('MM/DD/YY hh:mm A')}`}

        </CardText>


        {showRemoveButton()}

        <CardActions>
          <FlatButton onClick={() => props.deleteEvent(props.activity, props.user, props.city)} label='Remove' />
        </CardActions>
      </Card>
    );

  } else {  //is eatin
    return (
      <Card style={cardStyle}>
        <CardMedia>
          <img src={props.activity.logo} alt =''/>
        </CardMedia>

        <CardTitle
          title = {
            <a
              href={props.activity.url}
              target='_blank'
              style={styles.anchor}
            >{props.activity.name}</a>
          }

          subtitle={calcDollarSigns(props.activity.price)}
          titleStyle = {styles.cardTitle}
          subtitleStyle = {styles.cardSubtitle}
        />

        <CardText>
          {props.activity.address}
          {props.activity.details}
        </CardText>


        {showRemoveButton()}

        <CardActions>
          <FlatButton onClick= {() => props.deleteFood(props.activity,props.user,props.city)} label = 'Remove' />
        </CardActions>
      </Card>
    );
  }
}

export default Activity;