const express = require('express');
const Users = require('Fill_Me_In')
const bcrypt = require('bcrypt-nodejs')
const app = expres();

// helper func to check if pw matches user also decrypts.
app.checkPassword = (users, userName, pw) => {
  let match = false;
  users.forEach( user => {
    // compares pw and each individual user's pw (returns true/false)
    let unhashedPw = bcrypt.compareSync(pw, user.attributes.password)
    // check if the usernames match and the pw matches
    if (user.attributes.username === userName && unhashedPw) {
      // if it does returns true resulting in a matched pw.
      match = true;
    }
  })
  return match;
}


// Receives a login post reqest
app.post('/login', (req, res) =>{
  // first sets username and pw to be used to check if they are a user.
  let userName = req.body.username
  let password = req.body.password

  // fetch users to then check pw against them
  Users.fetch().then((users) => {
    // checking if returns true (means its a matched username and pw)
    if (app.checkPassword(users, userName, password)) {
      // sets the curret session to being loggedIn
          // this can be changed how we handle it, this just worked for me -
          //    - before
      req.session.loggedIn = true;
      // then redirects to new page (i have it going to defalt - will likely -
        //  - change it to route to trip planning or userpage)
      res.redirect(301, '/')
    } else {
      // if unmatched username/pw alerts them and redirects to login again.
      alert('unmatching username and password')
      res.redirect(301, '/login')
    }
  })
})

// Possibly un-needed
/*
app.get('/login', (req, res) =>{
  res.render() {

  }
})
*/
