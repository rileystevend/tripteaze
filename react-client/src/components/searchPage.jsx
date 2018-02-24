import React from 'react';
import ReactDOM from 'react-dom';
import Events from './events.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

const SearchPage = (props) => {

  const updateCity = (event) => {
    props.actions.updateCity(event.target.value)
  };

  const updateEventQuery = (event) => {
    props.actions.updateEventQuery(event.target.value)
  };

  const submit = (event) => {
    event.preventDefault();
    if (props.state.city !== '') {
      console.log(props.state.username);
      props.actions.makeNewTrip(props.state.username, props.state.city)
    }
  };

  const submitEventQuery = (event) => {
    event.preventDefault();
    if (props.state.activeTrip.status) {
      props.actions.searchEvents(props.state.activeTrip.city, props.state.eventQuery)
    } else {
      window.alert('Please select a city for your trip first!');
    }
  };

  let message = '';
  let messageEvents = '';
  if (!props.state.activeTrip.status) {
    message = 'Pick a city for your trip!';
    messageEvents = 'First pick a city before searching events!';
  } else {
    message = `You\'re going to ${props.state.activeTrip.city}! \n Or plan a different trip: `; 
    messageEvents = `Type a keyword to find events in ${props.state.activeTrip.city}!`;
  }
  let showEvents = '';
  if(props.state.eventResults.length !==0) {
    showEvents = <Events events={props.state.eventResults} />
  }

  const dropdown = () => {
    if(props.state.authenticated && props.state.trips.length > 0) {
      return (
        <div> <SelectField floatingLabelText="Add to an Existing Trip"> 
        {props.state.trips.map((trip, index) => <MenuItem key = {index} value = {trip.city} primaryText= {trip.city} />)} </SelectField> </div>
      );
    }
  }

  return (
    <div>
      <Paper>
        {message}
        <form onSubmit = {submit}>
          <TextField id = 'city' onChange = {updateCity}/>
          <RaisedButton onClick={submit} label='Create Trip'/>
          {dropdown()}
        </form>
      {messageEvents}
      <form onSubmit = {submitEventQuery}>
        <input type='text' onChange = {updateEventQuery}/>
        <input type='submit' value='Search events for your trip!'/>
      </form>
      {showEvents}
      </Paper>
      PUT SEARCH FIELDS HERE
      <Link to='/trips'>UserPage</Link>
    </div>
  )
}


const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

