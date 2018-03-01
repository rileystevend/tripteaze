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
import { cyan50, cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

// import Background from '../../../images/bg.jpg';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme({
  card: {
    fontWeight: 'bold',
    titleColor: cyan700,
    subtitleColor: cyan200
  },
  cardText: {
    textColor: cyan800
  },
  palette: {
    textColor: cyan900
  },
  raisedButton: {
    color: cyan700,
    fontSize: 17,
    margin: 12,
    textColor: cyan50
  },
  flatButton: {
    fontSize: 11,
    fontWeight: 'bold',
    textColor: cyan600,
  },
});

const styles = {
  body: {
    textAlign: 'center',
    width: '100%'
  },
  discoverTrips: {
    // backgroundColor: cyan50,
    background: `linear-gradient(to bottom right, #f9f9f9, ${cyan50})`,
    color: cyan800,
    fontSize: 30,
    fontWeight: 'bold',
    padding: '0.5%',
    textAlign: 'center',
  },
  header: {
    // backgroundColor: cyan100,
    background: `linear-gradient(to bottom right, ${cyan50}, ${cyan100})`,
    // backgroundImage: `url(${Background})`,
    // backgroundImage: `url('http://blog.hotelengine.com/wp-content/uploads/2017/10/pexels-photo-346885-1200x550.jpeg')`,
    // border: '1px solid white',
    // margin: '0 auto',
    fontSize: 45,
    fontWeight: 'bold',
    paddingTop: '15%',
    marginTop: '3%',
    textAlign: 'center'
  },
  navLinks: {
    // border: '1px solid gray',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '0.5%',
    marginLeft: '0.5%',
    position: 'absolute',
    // right: '0.5em'
  },
  tripButton: {
    width: '50%',
    margin: '0 auto',
    // marginBottom: '1%',
    marginTop: '2%'
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
        <Paper>
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
          </div>

          <div style={styles.header}>TripTeaze</div>

          <div style={styles.body}>
            <RaisedButton
              label="Create a trip"
              onClick={this.toSearchPage.bind(this)}
              style={styles.tripButton}
            />

            <div style={{marginTop: '1em'}}>
              <div style={styles.discoverTrips}>Discover</div>

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
