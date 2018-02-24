import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const StatePage = (props) => {

  const updateCity = (event) => {
    props.actions.updateCity(event.target.value)
  };

  const submit = (event) => {
    event.preventDefault();
    if (props.state.city !== '') {
      props.actions.makeNewTrip(props.state.username, props.state.city)
    }
  };

  let message = '';
  if (!props.state.activeTrip.status) {
    message = 'Pick a city for your trip!'
  } else {
    message = `You\'re going to ${props.state.activeTrip.city}! \n Or plan a different trip: ` 
  }

  const dropdown = () => {
    if(props.state.authenticated) {
      return (
        <div> <SelectField floatingLabelText="Add to an Existing Trip"> 
        {this.state.trips.map((trip, index) => <MenuItem key = {index} value = {trip.city} primaryText= {trip.city} />)} </SelectField> </div>
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
      </Paper>
      PUT SEARCH FIELDS HERE
    </div>
  )
}


const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(StatePage);

