const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('../database-mongo/index.js');

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

  db.retrieveUserPassword(userName, (userPw) => {
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
/*************************** TRIP STUFF ***************************/
app.get('/trips', (req, res) => {
	const type = req.query.search; // right now tailored for public trips but can be adapted for user trips as well
	if (type === 'public') {
		db.showAllPublicTrips(function(err, data) {
			if (err) {
				res.status(500).end(err);
			} else {
				res.status(200).json({trips: data})
			}
		})
	} else {
		res.status(500).end();
	}
});

app.post('/trips', (req, res) => {
	const user = (req.body.tripUser);
	const city = (req.body.tripCity);
	db.addNewTrip(user, city, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			console.log(data);
			res.status(200);
			res.status(200).json({ city: data.city });
		}
	});
})

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port 3000!');
});
