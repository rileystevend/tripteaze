import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
  //thunk is a middleware package for redux that allows your 
  //actions to return functions that return objects for the reducer
  //these functions are usually asynchronous and that is why they are good

import { connect } from 'react-redux'; 
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';

import reducer from './reducers/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

// These functions will never actually make sense, basically just maps state and actions onto properties
// bindActionCreators wraps actions into functions that can be called normally and will automatically dispatch

// const mapStateToProps = (state) => (
//   state
// );
//state is an object
//or you can only pull certain parts of the state into your component like { videos: state.videos }
//the props of this component becomes whatever object is return from the function

// const mapDispatchToProps = dispatch =>
//   ({
//     actions: bindActionCreators(actions, dispatch)
//   });

//this gives you access to all actions by way of props.actions.actionName

// export default connect(mapStateToProps, mapDispatchToProps)(App);
// pulls it all together



ReactDOM.render(<Provider store = {createStore(reducer, applyMiddleware(thunk))}> 
  <App /> </Provider> , document.getElementById('app'));