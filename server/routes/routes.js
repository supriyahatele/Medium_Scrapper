const Article = require("../models/articleModel");
const express=require("express");
const { scrapeArticle } = require("../config/scapper");
const scrapperRouter= express.Router()
scrapperRouter.post('/scrape', async (req, res) => {
    const { topic } = req.query;
  
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }
  
    try {
      const articles = await scrapeArticle(topic);
  
      
      await Article.insertMany(articles);
  
      res.json({ message: 'Scraping successful', articles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  scrapperRouter.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find().limit(5).sort({ _id: -1 });
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch articles' });
    }
  });
  
  module.exports ={scrapperRouter}