import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import * as theme from './homePage.jsx';  // * does all named exports from that file
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan50, cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900 } from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';
import Login from './login.jsx';
import Trip from './trip.jsx'; 
import * as actions from '../actions/index.js';

const styles = {
  notLoggedIn: {
    background: `linear-gradient(to bottom right, #f9f9f9, ${cyan50})`,
    color: cyan800,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '2%',
    padding: '0.5%',
    textAlign: 'center'
  }
}

class UserPage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.state.authenticated) {
      this.props.actions.fetchTrips(this.props.state.username);
    }
  }

  toSearchPage() {
    this.props.history.push('/plan');
  }

  generateMessage () {
    if (this.props.state.trips.length === 0) {
      return (
        <div>
          You don't have any trips yet :(
          <p/>
          Why not go <Link to='/plan' style={{textDecoration: 'none', color: cyan900}}>plan</Link> one?
        </div>
      );
    } else {
      return (
        <div>{this.props.state.username}'s Current Trips</div>
      );
    }
  }

  render() {
    if (this.props.state.authenticated === true) { // If logged in
      return (
        <MuiThemeProvider muiTheme={theme.muiTheme}>
          <Paper>
            {/************************** NAVIGATION **************************/}
            <div style={theme.styles.navLinks}>
              <Link to= '/'>
                <RaisedButton
                  label="Home"
                />
              </Link>
              <Link to='/'> 
                <RaisedButton
                  onClick = {this.props.actions.logOut}
                  style={{marginLeft: '1em'}}
                  label = 'Log Out'
                /> 
              </Link>
            </div>

            {/************************** HEADER **************************/}
            <div style={theme.styles.header}>
              <Link to="/" style={{textDecoration: 'none', color: cyan900}}>
                TripTeaze
              </Link>
            </div>

            {/************************** MESSAGE **************************/}
            <div style={theme.styles.body}>
              <Link to="plan">
                <RaisedButton
                  label="Create a trip"
                  style={theme.styles.tripButton}
                />
              </Link>

              <div style={theme.styles.discoverTrips}>{this.generateMessage()}</div>

              {/************************** USER'S TRIPS **************************/}
              {this.props.state.trips.map((trip, index) => 
                <Trip
                  key = {index}
                  index = {index} //you're not allowed to later access 'key' as prop, which is dumb
                  user = {this.props.state.username} 
                  trip = {trip} 
                  editable = {true}
                  delete = {this.props.actions.deleteTrip}
                  toggleStatus = {this.props.actions.toggleTripStatus}
                  toSearchPage = {this.toSearchPage.bind(this)}
                  activate = {this.props.actions.activateTrip}
                />
              )}
            </div>
          </Paper>
        </MuiThemeProvider>
      );
    } else { // If not logged in
      return (
        <MuiThemeProvider muiTheme={theme.muiTheme}>
          <Paper>
            {/************************** NAVIGATION **************************/}
            <div style={theme.styles.navLinks}>
              <Link to= '/'>
                <RaisedButton
                  label="Home"
                />
              </Link>
              <Link to= 'plan'>
                <RaisedButton
                  label="New Trip"
                  style={{marginLeft: '1em'}}
                />
              </Link>
              <Link to='/'> 
                <RaisedButton
                  onClick = {this.props.actions.logOut}
                  style={{marginLeft: '1em'}}
                  label = 'Log Out'
                /> 
              </Link>
            </div>

            {/************************** HEADER **************************/}
            <div style={theme.styles.header}>
              <Link to="/" style={{textDecoration: 'none', color: cyan900}}>
                TripTeaze
              </Link>
            </div>
          
            <div style={styles.notLoggedIn}>
              Oops! Please 
              <Link to="/" style={{textDecoration: 'none', color: cyan900}}> login </Link>
              to access this content!
            </div>
          </Paper>
        </MuiThemeProvider>
      );
    }
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

