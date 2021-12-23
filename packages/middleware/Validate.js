const { body } = require('express-validator')

const Auth = (method) => {
  switch (method) {
    case 'registration': {
      return[
        body('email').exists(),
        body('username').exists(),
        body('password').exists().isLength({ min: 6 })
      ]
    }
    case 'login': {
      return [
        body('username').exists(),
        body('password').exists().isLength({ min: 6 }),
      ]
    }
    case 'article': {
      return[
        body('title').exists(),
        body('content').exists()
      ]
    }
  }
}

module.exports = Auth;