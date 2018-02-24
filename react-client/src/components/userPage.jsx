import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import Trip from './trip.jsx';
import {Link} from 'react-router-dom';

class UserPage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchTrips(this.props.state.username);
  }

  generateMessage () {
    if (this.props.state.trips.length === 0) {
      return (<div> You don't have any trips yet :( </div>);
    } else {
      return (<div> These are your trips you've been planning </div>);
    }
  }

  render() {
    return (
      <div>
        {this.generateMessage()}
        
        {this.props.state.trips.map((trip, index) => <Trip key = {index} trip = {trip} />)}
        <Link to='/plan'>SearchPage</Link>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {state: state}
);

const mapDispatchToProps = dispatch =>
  ({
    actions: bindActionCreators(actions, dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

