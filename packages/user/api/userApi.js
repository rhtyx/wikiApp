const User = require('../service/userDB');

const Router = require('express').Router();
const md5 = require('md5')

Router.route('/register')
  .post((req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password)
    })

    newUser.save((err) => {
      if(!err) {
        res.send('Successfully create a new user')
      } else {
        res.send(err)
      }
    })
  });

Router.route('/login')
  .post((req, res) => {
    const { email, password } = req.body

    User.findOne({ email: email }, (err, result) => {
      if(!err) {
        if(result.password === md5(password)) {
          res.send('Successfully login')
        } else {
          res.send('Password you entered is wrong')
        }
      } else {
        res.send(err)
      }
    })
  });

module.exports = Router;