const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Require the User model in order to interact with the database
const Article = require("../models/article.model");
const User = require("../models/User.model");
// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:id", (req, res, next) => {
  const articleId = req.params.id;
  Article.findById(articleId)
    .populate("author")
    .then((article) => {
      article = {
        content: article.content,
        title: article.title,
        author: article.author.username,
        authorId: article.author._id,
        creationMonth: article.createdAt.getMonth(),
        creationYear: article.createdAt.getFullYear(),
        img: article.imgUrl,
      };
      console.log(article);
      res.render("../views/article/article-page", { article });
    })
    .catch((err) => next(err));
});

// Create an article
router.get("/create", (req, res, next) => {
  res.render("articles/create");
});

router.post("/create", (req, res, next) => {
  const blog = new Article({
    title: req.body.title,
    author: req.body.author,
    topics: req.body.topics,
    content: req.body.content,
    views: views.body.content,
  });

  Article.save()
    .then((newArticle) => {
      res.redirect(`/articles/${newArticle.id}`);
    })
    .catch((err) => next(err));
});

router.get("articles/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .then((articleToEdit) => {
      console.log(articleToEdit);
      res.render(`articles/update-articles.hbs`, { article: articleToEdit });
    })
    .catch((e) => {
      console.log("error updating article", e);
      next(e);
    });
});

router.post("/articles/:id/edit", (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.redirect(`/drones`))
    .catch((error) => next(error));
});
module.exports = router;
