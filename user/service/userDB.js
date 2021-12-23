require('dotenv').config();
const mongoose = require('./../../database/MongooseConnect');
const encrypt = require('mongoose-encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
});
userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] })

const User = mongoose.model('User', userSchema)

module.exports = User