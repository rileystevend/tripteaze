const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.checkPassword = (users, userName, pw) => {
  let match = false;
  db.forEach( user => {
    let unhashedPw = bcrypt.compareSync(pw, user.attributes.password)
    if (user.attributes.username === userName && unhashedPw) {
      match = true;
    }
  })
  return match;
}


app.get('/login', (req, res) =>{
  let userName = req.body.username
  let password = req.body.password

  db.fetch().then((users) => {
    if (app.checkPassword(users, userName, password)) {
      req.session.loggedIn = true;
      res.end();
    } else {
      alert('Unmatching username and password');
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


const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port 3000!');
});
