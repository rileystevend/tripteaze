import React from 'react';
import ReactDOM from 'react-dom';
import Events from './events.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';

const SearchPage = (props) => {

  let activeCity = props.state.trips[props.state.activeTrip.index].city;

  const updateCity = (event, index, value) => {
    if (value) {
      props.actions.activateTrip(index - 1);
    } else {
      props.actions.updateCity(event.target.value)
    }
  }

  const updateEventQuery = (event) => {
    props.actions.updateEventQuery(event.target.value)
  };

  const submit = (event) => {
    event.preventDefault();
    if (props.state.city !== '' && props.state.tripFromDate !== '' && props.state.tripToDate !== '') {
      props.actions.makeNewTrip(props.state.username, props.state.city, props.state.trips.length, props.state.tripFromDate, props.state.tripToDate);
      console.log('state', props.state)
    } else {
      console.log('city or dates missing')
    }
  };

  const submitEventQuery = (event) => {
    event.preventDefault();
    if (props.state.activeTrip.status) {
      props.actions.searchEvents(activeCity, props.state.eventQuery)
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
    message = `You\'re going to ${activeCity}! \n Or plan a different trip: `; 
    messageEvents = `Type a keyword to find events in ${activeCity}!`;
  }

  let showEvents = '';

  if(props.state.eventResults.length !==0) {
    showEvents = <Events 
      events={props.state.eventResults}
      addEventToTrip={props.actions.addEventToTrip}
      user={props.state.username}
      city={activeCity}
      />
  }

  let tripIndex = 0;

  const dropdown = () => {
    if(props.state.authenticated && props.state.trips.length > 0) {
      return (
        <DropDownMenu value={tripIndex} onChange = {updateCity}> 
          <MenuItem value={null} primaryText='' />
          {props.state.trips.map((trip, index) => <MenuItem key = {index} value = {trip.city} primaryText = {trip.city}/>)}
        </DropDownMenu>
      );
    }
  }

  /*************************** DATE SELECTION STUFF ***************************/
  const today = new Date();

  const updateFromDate = (event, date) => {
    // Dates need to be in YYYY-MM-DD format
    let fromDate = moment(date).format('YYYY-MM-DD');
    props.actions.updateFromDate(fromDate);

    // This sets minimum "To" date based on the current "From" date in the correct date format
    props.actions.setMinToDate(date);
  }

  const updateToDate = (event, date) => {
    // Dates need to be in YYYY-MM-DD format
    let toDate = moment(date).format('YYYY-MM-DD');
    props.actions.updateToDate(toDate);
  }
  /****************************************************************************/

  return (
    <Paper>
      <Link to= 'trips'> UserPage </Link>
      <Paper>

        <div>
          Select Your Trip Dates:
          <DatePicker
            floatingLabelText="From"
            autoOk={true}
            onChange={updateFromDate}
            minDate={today}
          />

          <DatePicker
            floatingLabelText="To"
            autoOk={true}
            onChange={updateToDate}
            // defaultDate={} TODO: set default "to" date to the "from" date
            minDate={props.state.minToDate} 
          />
        </div>

        {message}
        <form onSubmit = {submit}>
          <TextField id = 'city' onChange = {updateCity}/>
          <RaisedButton onClick={submit} label='Create Trip'/>
          {dropdown()}
        </form>
        {messageEvents}
        <form onSubmit = {submitEventQuery}>
          <TextField id = 'event' onChange = {updateEventQuery}/>
          <RaisedButton onClick={submitEventQuery} label='Search events for your trip!'/>
        </form>
      </Paper>
      
      <Paper>
        {showEvents}
      </Paper>
    </Paper>
  )
}


const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

