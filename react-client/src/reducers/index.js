const initialState = {
  username: '', 
  password: '', 
  authenticated: false, 
  currentError: '', 
  city: '',
  eventQuery: '',
  trips: [],
  eventResults: [],
  activeTrip: {
      status: false,
      index: 0
    }
}; //will need to be updated as needed

const reducer = function (state = initialState, action) {  //if state is undefined, state becomes inital state

  switch (action.type) {
    case 'SHOW_TRIPS' :
      return Object.assign({}, state, { trips: action.payload })
    case 'UPDATE_EVENTRESULTS' :
      return Object.assign({}, state, { eventResults: action.payload })
    case 'UPDATE_USERNAME':
      return Object.assign({}, state, { username: action.payload })
    case 'UPDATE_PASSWORD':
      return Object.assign({}, state, { password: action.payload })
    case 'AUTHEN' :
      return Object.assign({}, state, { authenticated: true }); 
    case 'UPDATE_EVENTQUERY':
      return Object.assign({}, state, { eventQuery: action.payload  }) 
    case 'UPDATE_CITY' :
      return Object.assign({}, state, { city: action.payload })
    case 'SET_TRIP' :
      return Object.assign({}, state, { activeTrip: {status: true, index: action.payload }})
    case 'ERROR' :
      return Object.assign({}, state, { currentError: action.payload })
    case 'REFRESH_TRIP_EVENTS' :
      const oldTrip = state.trips[action.payload.index];
      const newTrip = Object.assign({}, oldTrip, { events: action.payload.events });
      const oldTrips = state.trips.slice();
      const final = oldTrips.splice(action.payload.index, 1, newTrip);
      return Object.assign({}, state, { trips: final });
    case 'REFRESH_TRIP_EATIN':
      const oldTripEatin = state.trips[action.payload.index];
      const newTripEatin = Object.assign({}, oldTripEatin, { eatin: action.payload.eatin });
      const oldTripsEatin = state.trips.slice();
      const finalEatin = oldTripsEatin.splice(action.payload.index, 1, newTripEatin);
      return Object.assign({}, state, { trips: finalEatin });
    default:
      return state;  //if unrecognized action type nothing happens
  }
}

export default reducer;

/*
EXAMPLE

* action/index.js
*
* exports const newThing = (thing) => ({type: NEW_THING, thing: thing});
*

const initialState = { thing: 0 };

const reducer = function (state = initialState, action) {  //if state is undefined, state becomes inital state
                                                          //action is the object returned by a function in the actions/index.js file

  switch (action.type) {
    // case 'NEW_THING':
    //   return Object.assign(state, {thing : action.thing}) //makes a new state object with thing property overwritten

    default:
      return state;  //if unrecognized action type nothing happens
  }
}
*/
