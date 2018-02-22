import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';  // * does all named exports from that file
import { bindActionCreators } from 'redux';
import Signup from './signup.jsx';
import Login from './login.jsx';
import { Link } from 'react-router-dom';

let Home = (props) => {
    //has props.state with all the state things
    //and props.actions with all the action creating functions
    let actions = props.actions; //access shortcuts
    let state = props.state;

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
      </div>
    )
}

const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
