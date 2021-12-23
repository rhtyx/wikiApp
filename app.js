const express = require('express');
const bodyParser = require('body-parser');
const ArticleApi = require('./packages/article/api/articleApi');
const UserApi = require('./packages/user/api/userApi');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'This is our little secret.',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(express.static('public'));

app.use('/api', ArticleApi);
app.use('/api', UserApi)

app.listen(3000, () => {
  console.log('Server is listen to port 3000');
})