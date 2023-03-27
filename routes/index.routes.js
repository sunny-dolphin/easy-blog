const express = require("express");
const express = require("express");
const express = require("express");
const router = express.Router();
const Article = require("../models/article.model");
const User = require("../models/User.model");

const Article = require("../models/article.model");
const User = require("../models/User.model");
/* GET home page */
router.get("/", (req, res, next) => {
  Article.find({})
    .populate("author")
    .then((articlesFromDb) => {
      //sort Articles by Creation Date
      articlesFromDb.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
      //only display three articles
      const threeArticles = articlesFromDb.slice(0, 5);
      const articles = [];
      //Select and transform data for view -> this could be done with mapfunction
      for (const article of threeArticles) {
        articles.push({
          id: article._id,
          content: article.content.slice(0, 100) + "...",
          title: article.title,
          author: article.author.username,
          creationMonth: article.createdAt.getMonth(),
          createdYear: article.createdAt.getFullYear(),
          img: article.imgUrl,
        });
      }
      console.log(articles[0]);
      res.render("index", { articles });
    })
    .catch((err) => next(err));
  res.render("index");
  Article.find({})
    .populate("author")
    .then((articlesFromDb) => {
      //sort Articles by Creation Date
      articlesFromDb.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
      //only display three articles
      const threeArticles = articlesFromDb.slice(0, 5);
      const articles = [];
      //Select and transform data for view -> this could be done with mapfunction
      for (const article of threeArticles) {
        articles.push({
          content: article.content.slice(0, 100) + "...",
          title: article.title,
          author: article.author.username,
          creationMonth: article.createdAt.getMonth(),
          createdYear: article.createdAt.getFullYear(),
          img: article.imgUrl,
        });
      }
      console.log(articles[0]);
      res.render("index", { articles });
    })
    .catch((err) => next(err));
});

module.exports = router;
