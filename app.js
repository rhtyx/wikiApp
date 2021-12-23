const express = require('express');
const bodyParser = require('body-parser');
const ArticleApi = require('./article/api/articleApi');
const UserApi = require('./user/api/userApi')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.use('/api', ArticleApi);
app.use('/api', UserApi)

app.listen(3000, () => {
  console.log('Server is listen to port 3000');
})