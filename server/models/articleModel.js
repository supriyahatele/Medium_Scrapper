const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: String,
  link: String
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;