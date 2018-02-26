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
      this.props.actions.fetchTrips('public');
    }

    redirect(url) {
      this.props.history.push(url);
    }
    
    render () {
      let actions = this.props.actions; //access shortcuts
      let state = this.props.state;
    //has props.state with all the state things
    //and props.actions with all the action creating functions
    

      return (
        <div>
          <Login login = {actions.login}
            username = {state.username}
            password = {state.password}
            updateUsername = {actions.updateUsername}
            updatePassword = {actions.updatePassword}
            redirect = {this.redirect.bind(this)}
            />
          <Signup signup={actions.signup}
            username={state.username}
            password={state.password}
            updateUsername={actions.updateUsername}
            updatePassword={actions.updatePassword}
            redirect={this.redirect.bind(this)}
            /> 
          <br/>
          <Link to='/trips'>UserPage</Link>
          <br/>
          <Link to='/plan'>SearchPage</Link>
          <h3> Other people's trips </h3>
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
