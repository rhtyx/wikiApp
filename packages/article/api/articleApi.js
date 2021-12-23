const Article = require("../service/articleDB");
const Router = require('express').Router();
const validate = require('../../middleware/Validate');
const { validationResult } = require('express-validator');

Router.route('/articles')
  .get(
    (req, res) => {
      if(req.isAuthenticated()) {
        Article.find((err, articles) => {
          if (!err){
            res.send(articles)
          } else {
            res.send(err)
          }
        })
      } else {
        res.send('Please login first.')
      }
    }
  )
  .post(
    validate('article'),
    (req, res) => {
    if(req.isAuthenticated()) {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.status(422).json({ errors: err.array() });
        return;
      }

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
    } else {
      res.send('Please login first.')
    }
  })
  .delete((req, res) => {
    if(req.isAuthenticated()) {
      Article.deleteMany((err) => {
        if(!err) {
          res.send('Successfully deleted all articles')
        } else {
          res.send(err)
        }
      })
    } else {
      res.send('Please login first.')
    }
  });

Router.route('/articles/:article_name')
  .get((req, res) => {
    if(req.isAuthenticated()) {
      Article.findOne({ title: req.params.article_name }, (err, article) => {
        if(!err) {
          if(article) {
            res.send(article)
          } else {
            res.send('The article was not found')
          }
        }
      })
    } else {
      res.send('Please login first.')
    }
  })
  .put((req, res) => {
    if(req.isAuthenticated()) {
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
    } else {
      res.send('Please login first.')
    }
  })
  .patch((req, res) => {
    if(req.isAuthenticated()) {
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
    } else {
      res.send('Please login first.')
    }
  })
  .delete((req, res) => {
    if(req.isAuthenticated()) {
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
    } else {
      res.send('Please login first.')
    }
  });

module.exports = Router;