import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';

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

  return (
    <div>
      {message}
      <form onSubmit = {submit}>
        <input type='text' onChange = {updateCity}/>
        <input type='submit' value='Create Trip'/>
      </form>
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

