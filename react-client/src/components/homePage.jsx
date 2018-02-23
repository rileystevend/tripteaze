import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';  // * does all named exports from that file
import { bindActionCreators } from 'redux';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Trip from './trip.jsx';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor (props) {
      super(props);
    }

    componentWillMount() {
      this.props.actions.fetchPublicTrips();
    }
    
    render () {
      let actions = this.props.actions; //access shortcuts
      let state = this.props.state;
    //has props.state with all the state things
    //and props.actions with all the action creating functions

      return (
        <div>
          {state.username}
          <Login login = {actions.login}
            username = {state.username}
            password = {state.password}
            updateUsername = {actions.updateUsername}
            updatePassword = {actions.updatePassword}
            />
          <Signup signup={actions.signup}
            username={state.username}
            password={state.password}
            updateUsername={actions.updateUsername}
            updatePassword={actions.updatePassword}
            /> 
          <br/>
          <Link to='/trips'>UserPage</Link>
          <br/>
          <Link to='/plan'>SearchPage</Link>
          {state.trips.map((trip, index) => (<Trip key={index} trip={trip} />))}
        </div>
      )
    };
}

const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
