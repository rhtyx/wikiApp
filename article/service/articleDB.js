const mongoose = require('./../../database/MongooseConnect')

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model('Article', articleSchema)

module.exports = Article;