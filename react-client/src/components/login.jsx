import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const Login = (props) => {

  let submit = (event) => {
    event.preventDefault();
    props.login(props.username, props.password);
    props.redirect('/trips');
  }

  let changeUsername = (event) => {
    props.updateUsername(event.target.value);
  }

  let changePassword = (event) => {
    props.updatePassword(event.target.value);
  }

  return (
    <Paper>
      <h2>Login</h2>
      <form onSubmit = {submit}>
        <div>
          <label>Username:</label>
          <TextField id = 'LUsername' type="text" onChange={changeUsername}/>
        </div>
        <div>
          <label>Password:</label>
          <TextField id = 'LPassword' type="password" onChange={changePassword}/>
        </div>
        <div>
          <RaisedButton label='Login' onClick = {submit} />
        </div>
      </form>
    </Paper>
  )
}

export default Login;
