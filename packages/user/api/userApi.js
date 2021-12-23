const User = require('../service/userDB');

const Router = require('express').Router();
const bcrypt = require('bcrypt');
const rounds = 10;

Router.route('/register')
  .post((req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, rounds, (err, hash) => {
      const newUser = new User({
        email: req.body.email,
        password: hash
      })
      newUser.save((err) => {
        if(!err) {
          res.send('Successfully create a new user')
        } else {
          res.send(err)
        }
      })
    })
  });

Router.route('/login')
  .post((req, res) => {
    const { email, password } = req.body

    User.findOne({ email: email }, (err, account) => {
      if(!err) {
        bcrypt.compare(password, account.password, (err, result) => {
          if(result == true) {
            res.send('Successfully login')
          } else {
            res.send('The password you entered is wrong')
          }
        })
      } else {
        res.send(err)
      }
    })
  });

module.exports = Router;