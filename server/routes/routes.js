
const express=require("express");
const { createScrapArticle, getArticles } = require("../controllers/articleScrapperController");

const scrapperRouter= express.Router()
scrapperRouter.post('/scrape',createScrapArticle);
  
  scrapperRouter.get('/articles',getArticles );
  
  module.exports ={scrapperRouter}