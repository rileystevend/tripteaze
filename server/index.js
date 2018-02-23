const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('../database-mongo/index.js'); // Check database file FILL_ME_IN_SON
const eventbrite = require('../APIhelper/eventbrite.js');

const app = express();
app.use(bodyParser.json());

app.use(session({
	secret: 'shhhhh af',
	resave: false,
	saveUnitialized: true
}));

app.use(express.static(__dirname + '/../react-client/dist'));


/***********************************************************************/
/*                        login                                        */

app.checkPassword = (userName, pw, checkPw) => {
  let match = false;
	console.log('before brypt')
    let unhashedPw = bcrypt.compareSync(pw, checkPw)
		console.log('after bcrypt')
    if (unhashedPw) {
      match = true;
    }
		console.log('match', match)
  return match;
}

app.get('/login', (req, res) =>{
  let userName = req.query.username
  let password = req.query.password

  User.retrieveUserPassword(userName, (userPw) => {
		if (app.checkPassword(userName, password, userPw)) {
			console.log('hit in if')
			req.session.loggedIn = true;
			res.end()
		} else {
			console.log('Unmatching username and password')
      res.end();
		}
	})
})


app.get('/logout', (req, res) => {
   req.session.destroy((err) => {
     if (err) {
       throw err
     }
   })
   res.redirect(301, /* figured could redirect to*/ '/login' /*or'/homepage' */);
})

/*************************** SIGN UP STUFF ***************************/

// Sign up
app.post('/signup', (req, res) => {
	console.log(req.body, req.query, 'signup')
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
				if (err) {
					throw err;
				} else {
					// Store new username/hashed password in database
					// (username, hash) call function from db to store username and hash // FILL_ME_IN_SON
				}})
				.then(newUser => {
					// Creates new session for the user
					createSession(req, res, newUser);
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

/******************************** Search - Events *****************************/

app.post('/events', function (req, res) {
	//var eventQuery = req.body.query;
	console.log('heresbody',req.body);
	eventbrite.searchEvents('bollywood', (err, data) => {
		if(err) {
			res.sendStatus(500);
			console.log('error');
		} else {
			res.statusCode=201;
			data.forEach((event) => {
				console.log('heresdata', event.name.text);
			});
		}
		res.end();
	});

});


/****************************************************************************/
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port 3000!');
});
