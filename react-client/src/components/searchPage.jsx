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
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import { Link } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';

class SearchPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
      activeCity: props.state.trips[props.state.activeTrip.index].city,
      dropdown: 0,
      activeFromDate: props.state.trips[props.state.activeTrip.index].fromDate
    }
  }

  updateCity (event, index, value) {
    if (value && index !== 0) {
      this.setState({dropdown: value});
      this.setState({activeCity: this.props.state.trips[index - 1].city});
      this.props.actions.updateCity('');
      this.props.actions.activateTrip(index - 1);
    } else if (index === 0) {
      this.setState({ dropdown: value });
      this.props.actions.deactivate();
    } else {
      this.props.actions.updateCity(event.target.value)
    }
  }

  updateEventQuery (event) {
    this.props.actions.updateEventQuery(event.target.value)
  };

  submit (event) {
    event.preventDefault();

    if (props.state.city !== '' && props.state.tripFromDate !== '' && props.state.tripToDate !== '') {
      this.props.actions.makeNewTrip(this.props.state.username, this.props.state.city, this.props.state.trips.length, this.props.state.tripFromDate, this.props.state.tripToDate);
      this.setState({ activeCity: this.props.state.city });
    }
  };

  submitEventQuery (event) {
    event.preventDefault();
    if (this.props.state.activeTrip.status) {
      this.props.actions.searchEvents(this.state.activeCity, this.props.state.eventQuery, this.state.activeFromDate)
    } else {
      window.alert('Please select a city for your trip first!');
    }
  };

/***************************** Food - search **********************************/
  updateFoodQuery (event) {
    props.actions.updateFoodQuery(event.target.value)
  };

  submitFoodQuery (event) {
    event.preventDefault();
    if(props.state.activeTrip.status) {
      props.actions.searchForFood(props.state.activeTrip.city, props.state.foodQuery)
    } else {
      window.alert('Please select a city for your trip first!')
    }
  };

/******************************************************************************/

  render () {
    let message =  '';
    let messageEvents = '';
    let activeCity = this.state.activeCity;
    let messageFood = '';
    
    if (!props.state.activeTrip.status) {
      message = 'Pick a city for your trip!';
      messageEvents = 'First pick a city before searching events!';
      messageFood = '';
    } else {
      message = `You\'re going to ${props.state.activeTrip.city}! \n Or plan a different trip: `;
      messageEvents = `Type a keyword to find events in ${props.state.activeTrip.city}!`;
      messageFood= `Or search for food in ${props.state.activeTrip.city}!`;
    }
  
  /*************************** DATE SELECTION STUFF ***************************/
    let today = new Date();

    let updateFromDate = (event, date) => {
      // Dates need to be in YYYY-MM-DD format
      let fromDate = moment(date).format('YYYY-MM-DD');
      this.props.actions.updateFromDate(fromDate);

      // This sets minimum "To" date based on the current "From" date in the correct date format
      this.props.actions.setMinToDate(date);
    }

    const updateToDate = (event, date) => {
      // Dates need to be in YYYY-MM-DD format
      let toDate = moment(date).format('YYYY-MM-DD');
      this.props.actions.updateToDate(toDate);
    };
  /****************************************************************************/
  
    let showEvents = '';
  
    if(this.props.state.eventResults.length !==0) {
      showEvents = <Events 
        events={this.props.state.eventResults}
        addEventToTrip={this.props.actions.addEventToTrip.bind(this)}
        user={this.props.state.username}
        city={this.state.activeCity}
        />
    }
  
    const dropdown = () => {
      if(this.props.state.authenticated && this.props.state.trips.length > 0) {
        return (
          <SelectField 
            floatingLabelText="Existing Trips" 
            value={this.state.dropdown} 
            onChange = {this.updateCity.bind(this)}
            > 
            <MenuItem value = ' ' primaryText = 'Make a New Trip' />
            {this.props.state.trips.map((trip, index) => 
              <MenuItem key = {index} value = {trip.city} primaryText = {trip.city} />)}
          </SelectField>
        );
      }
    }
  
    return (
      <div>
        <Link to= 'trips'> UserPage </Link>

        <Drawer width={200} openSecondary={true} open={this.state.open} >
          <AppBar title="AppBar" />
        </Drawer>

        <Paper>
          {message}
          <div>
            Select Your Trip Dates!
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
              // defaultDate={} TODO: set default "to" date as the "from" date
              minDate={this.props.state.minToDate}
            />
          </div>
          <br />
          <TextField id='city' onChange={this.updateCity.bind(this)} />
          <RaisedButton onClick={this.submit.bind(this)} label='Create Trip' />
          <br />
          {dropdown()}
          {this.messageEvents}
          <form onSubmit = {this.submitEventQuery.bind(this)}>
            <TextField id = 'event' onChange = {this.updateEventQuery.bind(this)}/>
            <RaisedButton onClick={this.submitEventQuery.bind(this)} label='Search events for your trip!'/>
          </form>
        </Paper>
        
        <Paper>
          {showEvents}
        </Paper>
      </div>
    )
  }  
}


const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
