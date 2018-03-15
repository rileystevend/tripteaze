import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

import * as theme from './homePage.jsx';

export const styles = {
  actionButtons: {
    backgroundColor: '#f9f9f9',
    margin: '1%',
  },
};

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      open: false,
      actions: [
        <FlatButton
          label="Close"
          primary={true}
          onClick={this.handleClose}
          style={styles.actionButtons}
          key="close"
        />,
      ],
    };
  }

  componentDidMount() {
    this.setState({
      orderedEvents: this.props.trip.events.slice()
        .sort((a, b) => new Date(a.start_time) - new Date(b.start_time)),
      trip: this.props.trip,
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme.muiTheme}>
        <div>
          <FlatButton
            label="Get Summary"
            onClick={this.handleOpen}
          />
          {this.state.trip && <Dialog
            title={`Trip to ${this.state.trip.city} from ${moment(this.state.trip.fromDate).format('MM/DD/YY')} until ${moment(this.state.trip.toDate).format('MM/DD/YY')}`}
            actions={this.state.actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}>

            <label htmlFor="restaurantList">Restaurants:</label>
            <ul id="restaurantList">
              {this.state.trip.eatin.map(resto =>
                <li
                  key={resto.id}
                >{resto.name} at {resto.address}</li>
              )}
            </ul>

            <label htmlFor="eventList">Events:</label>
            <ul id="eventList">
              {this.state.orderedEvents && this.state.orderedEvents.map(event =>
                <li
                  key={event.id}
                >{`${event.name} on ${moment(event.start_time).format('ddd, MMM Do [at] h:mm a Z')}`}</li>
              )}
            </ul>

            <label htmlFor="hotelList">Hotels:</label>
            <ul id="hotelList">
              {this.state.trip.hotels.map(hotel =>
                <li
                  key={hotel.id}
                >{hotel.name}</li>
              )}
            </ul>
          </Dialog>}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Summary;
