const initialState = {}; //will need to be updated

const reducer = function (state = initialState, action) {  //if state is undefined, state becomes inital state

  switch (action.type) {
    case 'LOGIN':
      return Object.assign(state, {/*like a user or something*/}) //makes a new state object with thing property overwritten

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