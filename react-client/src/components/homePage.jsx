import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';  // * does all named exports from that file
import { bindActionCreators } from 'redux';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Trip from './trip.jsx';
import { Link } from 'react-router-dom';

// Styling stuff
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

// import Background from '../../../images/bg.jpeg';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  }
});

const styles = {
  body: {
    border: '5px solid red',
    display: 'block',
    textAlign: 'center'
  },
  discoverTrips: {
    border: '5px solid green'
  },
  header: {
    backgroundImage: `url('http://blog.hotelengine.com/wp-content/uploads/2017/10/pexels-photo-346885-1200x550.jpeg')`,
    border: '5px solid blue',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '100px',
    textAlign: 'center'
  },
  paperContainer: {
    // margin: '0 auto',
    // position: 'relative',
  },
  navLinks: {
    border: '5px solid yellow',
    float: 'right',
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
  }
}

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchTrips('public');
  }

  componentDidUpdate() {
    if (this.props.state.authenticated) {
      this.props.history.push('/trips');
    }
  }

  toUserPage () {
    this.props.history.push('/trips');
  }

  toSearchPage () {
    this.props.history.push('/plan')
  }

  render () {
    let actions = this.props.actions; //access shortcuts
    let state = this.props.state;
    //has props.state with all the state things
    //and props.actions with all the action creating functions

    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <Paper style={styles.paperContainer}>
          <div style={styles.header}>
            <h1> TripTeaze </h1>
        
            <div style={styles.navLinks}>
              <Login login={actions.login}
                username={state.username}
                password={state.password}
                updateUsername={actions.updateUsername}
                updatePassword={actions.updatePassword}
              />
              <Signup signup={actions.signup}
                username={state.username}
                password={state.password}
                updateUsername={actions.updateUsername}
                updatePassword={actions.updatePassword}
              />
              <RaisedButton label="User Page" onClick={this.toUserPage.bind(this)} />
            </div>
          </div>

          <div style = {styles.body}>
            <RaisedButton
              label="Create a trip!"
              onClick={this.toSearchPage.bind(this)}
              style={{
                width: '50%',
                margin: '0 auto',
                backgroundColor: '#FF9800',
              }}
            />

            <div style={styles.discoverTrips}>
              <h3> ~Discover~ </h3>

              {state.trips.map((trip, index) => (
                <Trip key={index} trip={trip} />
              ))}
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    )};
}

const mapStateToProps = state => (
  { state: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
