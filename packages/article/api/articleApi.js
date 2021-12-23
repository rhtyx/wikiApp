const Article = require("../service/articleDB")
const Router = require('express').Router()

Router.route('/articles')
  .get((req, res) => {
    Article.find((err, articles) => {
      if (!err){
        res.send(articles)
      } else {
        res.send(err)
      }
    })
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if(!err) {
        res.send('The article has been saved.')
      } else {
        res.send(err)
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if(!err) {
        res.send('Successfully deleted all articles')
      } else {
        res.send(err)
      }
    })
  });

Router.route('/articles/:article_name')
  .get((req, res) => {
    Article.findOne({ title: req.params.article_name }, (err, article) => {
      if(!err) {
        if(article) {
          res.send(article)
        } else {
          res.send('The article was not found')
        }
      }
    })
  })
  .put((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.article_name },
      { 
        title: req.body.title,
        content: req.body.content
      },
      { overwrite: true },
      (err) => {
        if(!err) {
          res.send('Successfully updated the article')
        } else {
          res.send(err)
        }
      }
    )
  })
  .patch((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.article_name},
      { $set: req.body },
      (err) => {
        if(!err) {
          res.send('Successfully patched article.')
        } else {
          res.send(err)
        }
      }
    )
  })
  .delete((req, res) => {
    Article.deleteOne(
      { title: req.params.article_name},
      (err) => {
        if(!err) {
          res.send('Successfully delete the article')
        } else {
          res.send(err)
        }
      }
    )
  });

module.exports = Router;