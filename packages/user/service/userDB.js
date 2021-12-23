require('dotenv').config();
const mongoose = require('../../../database/MongooseConnect');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = User