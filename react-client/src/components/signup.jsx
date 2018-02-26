import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

let Signup = (props) => {

	let submit = (event) => {
		event.preventDefault();
		props.signup(props.username, props.password);
		props.redirect('/search');
	}

	let changeUsername = event => {
		props.updateUsername(event.target.value);
	}

	let changePassword = event => {
		props.updatePassword(event.target.value);
	}
	
	return (
		<Paper>
			<h2>Sign up</h2>

			<form onSubmit = {submit} >
				<div>
					<label>Username:</label>
					<TextField id = "SUUsername" onChange = {changeUsername} />
				</div>
				<div>
					<label>Password:</label>
					<TextField id = 'SUPassword' type="password" onChange = {changePassword} />
				</div>
				<div>
					<RaisedButton label='Join' onClick={submit} />
				</div>
			</form>
		</Paper>
	);
}


export default Signup;