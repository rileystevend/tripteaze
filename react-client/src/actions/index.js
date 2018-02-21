

//SIMPLE ACTION
export const actionName = (neededParams) => ({type: ACTION_NAME, param: neededParams});
//ACTION_NAME must correspond with reducer switch option

/* complex action example w/ async
export const search = (searchTerm) => {
  return (dispatch) => {
    return makeAnAPIcall(searchTerm).then(
      searchResults => dispatch(updateResults(searchResults)),
      error => dispatch(badStuff(error))
    );
  };
}

const updateResults = (searchResults) => ({type: UPDATE_RESULTS, results: searchResults});
const badStuff = (error) => ({type: ASYNC_ERROR, error: error});

NOTES
-dispatch is a Redux keyword for triggering actions
  -it's actuallys being used under the hood but react-redux's mapDispatchToProps makes us
    not have to say dispatch when we usually call action functions
-actions are dispatched from the front-end (or here because of our middleware to handle asynchronicity)
  the return statement is automatically passed onto the reducer under the parameter action
-the capital names are action types, commonly reducers use this key in a switch to decide what to do 
  with the other parameters associated with the action (to modify the state)
*/