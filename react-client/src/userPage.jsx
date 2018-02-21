import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';

const UserPage = (props, actions) => {

    return (
    <div>
      <h1>Item List</h1>
      hello
    </div>
  )
}


const mapStateToProps = state => (
  {props: state}
);


const mapDispatchToProps = dispatch =>
  ({
    actions: bindActionCreators(actions, dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

