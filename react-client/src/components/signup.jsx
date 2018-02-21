import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { render } from 'react-dom';

const express = require('express');
const bodyParser = requrie('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const User = require('../../../database-mongo/index.js'); // Check database file FILL_ME_IN_SON

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(session({
	secret: 'shhhhh af',
	resave: false,
	saveUnitialized: true
}));

// Loads sign up page
app.get('/signup', (req, res) => res.render('signup'));

// Sign up
app.post('/signup', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	// Creates new user
	new User({
		// Need to check db for new user model // FILL_ME_IN_SON
		username: username
	})
	.fetch()
	.then(user => {
		// If the user does not exist
		if (!user) {
			// Hash the password
			bcrypt.hash(password, null, null, (err, hash) => {
				// Store new username/hashed password in database
				// (username, hash) call function from db to store username and hash // FILL_ME_IN_SON
				.then(newUser => {
					// Creates new session for the user
					createSession(req, res, newUser);
				});
			});
		} else {
			// If account already exists, redirect to signup page
			console.log('Account already exists!');
			res.redirect('/signup');
		}
	});
});

// Creates new session after new user is added to the database
const createSession = (req, res, newUser) => {
	return req.session.regenerate(() => {
		req.session.user = newUser;
		res.redirect('/'); // Where do we want to redirect? FILL_ME_IN_SON
	});
}