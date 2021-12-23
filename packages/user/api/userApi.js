const User = require('../service/userDB');
const passport = require('passport');
const Router = require('express').Router();

Router.route('/register')
  .post((req, res) => {
  User.register({ username: req.body.username, email: req.body.email }, req.body.password, (err, user) => {
    if(!err) {
      passport.authenticate('local')(req, res, () => {
        res.send('Successfully registered account')
      })
    } else {
      res.send(err)
    }
  })
  });

Router.route('/login')
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    
    req.login(user, (err, user) => {
      if(!err) {
        passport.authenticate('local')(req, res, () => {
          res.send('Successfully login')
        })
      } else {
        res.send(err)
      }
    })
  });

Router.route('/logout')
  .get((req, res) => {
    req.logout()
    res.send('Successfully logout')
  })

Router.route('/auth/google')
  .get((req, res) => {
    passport.authenticate('google', { scope: ['profile'] })(req, res, () => {
      res.redirect('https://www.googleapis.com/oauth2/v3/userinfo')
    })
  })

Router.route('/auth/google/source')
  .get((req, res) => {
    passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
      res.redirect('/api/articles')
    })
  })

module.exports = Router;