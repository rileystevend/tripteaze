import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

import * as actions from '../actions/index.js';
import Activity from './activity.jsx';
import Events from './events.jsx';

class SearchPage extends React.Component {
  constructor (props) {
    super(props);

    if (props.state.trips.length !== 0) {
      this.state = {
        open: false,
        activeCity: props.state.trips[props.state.activeTrip.index].city,
        dropdown: 0,
        activeFromDate: props.state.trips[props.state.activeTrip.index].fromDate
      }
    } else {
      this.state = {
        open: false,
        dropdown: 0
      }
    }
  }

  updateCity (event, index, value) {
    if (value && index !== 0) {
      this.setState({dropdown: value, open: true});
      this.setState({activeCity: this.props.state.trips[index - 1].city});
      this.props.actions.updateCity('');
      this.props.actions.activateTrip(index - 1);
    } else if (index === 0) {
      this.setState({ dropdown: value });
      this.props.actions.deactivate();
    } else {
      this.props.actions.updateCity(this.formatCity(event.target.value));
    }
  }

  formatCity (city) {
    const words = city.split(' ');
    let newWords = [];
    for (let word of words) {
      word = word.slice(0,1).toUpperCase().concat(word.slice(1).toLowerCase());
      newWords.push(word);
    }
    return newWords.join(' ');
  }

  updateEventQuery (event) {
    this.props.actions.updateEventQuery(event.target.value)
  };

  submit (event) {
    let state = this.props.state;
    event.preventDefault();
    if (state.city !== '' && state.tripFromDate !== '' && state.tripToDate !== '') {
      this.props.actions.makeNewTrip(state.username, state.city, state.trips.length, state.tripFromDate, state.tripToDate);
      this.setState({ activeCity: state.city, open: true });
    }
  };

  submitEventQuery (event) {
    let state = this.props.state;
    event.preventDefault();
    if (state.activeTrip.status || state.city) {
      let city = state.activeTrip.status ? this.state.activeCity : state.city;
      this.props.actions.searchEvents(this.state.activeCity, state.eventQuery, this.state.activeFromDate)
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
          <div>
            <SelectField 
              floatingLabelText="Existing Trips" 
              value={this.state.dropdown} 
              onChange = {this.updateCity.bind(this)}
            > 
              <MenuItem value = ' ' primaryText = 'Make a New Trip' />
              {this.props.state.trips.map((trip, index) => 
                <MenuItem key = {index} value = {trip.city} primaryText = {trip.city} 
              />)}
            </SelectField>
            <RaisedButton
              onClick={() => (this.setState({ open: !this.state.open }))}
              label='Show Details'
              disabled={!this.props.state.activeTrip.status}
            />
          </div>
        );
      }
    }

    const drawer = () => {
      
      if (this.props.state.activeTrip.status) {
        let activeTrip = this.props.state.trips[this.props.state.activeTrip.index]; 
        console.log(activeTrip);
        if (activeTrip) {
          return (
            <Drawer width={400} openSecondary={true} open={this.state.open} >
              <AppBar title={this.state.activeCity}
                iconElementLeft={<IconButton onClick={() => (this.setState({ open: false }))} ><NavigationClose /></IconButton>}
              />
              {activeTrip.events.map((event, index) => 
                (<Activity key={index} sidebar = 'true'
                  type='event' activity={event} />))}
              {activeTrip.eatin.map((restaurant, index) => 
                (<Activity key={index} sidebar='true'
                  type='food' activity={eatin} />))}
            </Drawer>
          );
        }
      } else {
        return;
      }
    }
  
    return (
      <div>
        <Link to= 'trips'> UserPage </Link>
        {drawer()}
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
          <h4> {message} </h4>
          <br />
          <TextField id='city' value={this.props.state.city} onChange={this.updateCity.bind(this)} />
          <RaisedButton onClick={this.submit.bind(this)} label='Create Trip' disabled={!this.props.state.authenticated} />
          <br />
          {dropdown()}
          {this.messageEvents}
        <Paper>
          <form onSubmit = {this.submitEventQuery.bind(this)}>
            <TextField id = 'event' onChange = {this.updateEventQuery.bind(this)}/>
            <RaisedButton 
              onClick={this.submitEventQuery.bind(this)} 
              label='Search events for your trip!' 
              />
          </form>
        </Paper>
          
          <Paper>
            {showEvents}
          </Paper>
        </Paper>
      </div>
    );
  }  
}


const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
