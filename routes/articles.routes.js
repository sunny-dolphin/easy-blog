const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Require the User model in order to interact with the database
const Article = require("../models/article.model");
// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");
const isOwner = require("../utils/isOwner");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

// Create an article
router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("create-article");
});
// Store the data received from create article form into database

router.post(
  "/create",
  isLoggedIn,
  fileUploader.single("imgPath"),
  (req, res, next) => {
    console.log(req.file.path);
    const blog = {
      title: req.body.title,
      author: req.session.currentUser._id,
      topics: req.body.topics,
      content: req.body.content,
      imgUrl: req.file.path,
    };
    console.log(blog);

    // Regular expression to check if title has only characters and spaces.
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(req.body.title)) {
      return res.status(400).render("create-article", {
        errorMessage:
          "You title should only contain words, no special characters or numbers allowed",
      });
    }
    if (
      req.body.title == "" ||
      req.body.imgUrl == "" ||
      req.body.content == ""
    ) {
      return res.status(400).render("create-article", {
        errorMessage:
          "All the fields are mandatory, Please provide title, description and select an image",
      });
    }

    Article.create(blog)
      .then((newArticle) => {
        // console.log(newArticle);
        res.redirect(`/articles/${newArticle.id}`);
      })
      .catch((err) => next(err));
  }
);

router.get("/:id", (req, res, next) => {
  const articleId = req.params.id;
  Article.findById(articleId)
    .populate("author")
    .then((article) => {
      article = {
        id: article.id,
        content: article.content,
        title: article.title,
        author: article.author.username,
        authorId: article.author._id,
        creationMonth: article.createdAt.getMonth(),
        creationYear: article.createdAt.getFullYear(),
        img: article.imgUrl,
        owner: isOwner(req, article.author.id),
      };
      // console.log(article);
      res.render("../views/article/article-page", { article });
    })
    .catch((err) => next(err));
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .populate("author")
    .then((articleToEdit) => {
      if (isOwner(req, articleToEdit.author.id)) {
        console.log(articleToEdit);
        res.render(`article/update-articles`, { article: articleToEdit });
      } else {
        console.log("No right to edit this article");
        res.redirect(401, "/");
      }
    })
    .catch((e) => {
      console.log("error updating article", e);
      next(e);
    });
});

router.post(
  "/:id/edit",
  isLoggedIn,
  fileUploader.single("imgPath"),
  (req, res, next) => {
    console.log(req.body, req.file);
    const { id } = req.params;
    let imageUrl;
    if (req.file) {
      console.log("New File");
      imageUrl = req.file.path;
    } else {
      console.log("No new image");
      imageUrl = req.body.existingImage;
    }
    const blog = {
      title: req.body.title,
      author: req.session.currentUser._id,
      topics: req.body.topics,
      content: req.body.content,
      imgUrl: imageUrl,
    };
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(req.body.title)) {
      return res.status(400).render("create-article", {
        errorMessage:
          "You title should only contain words, no special characters or numbers allowed",
      });
    }
    if (
      req.body.title == "" ||
      req.body.imgUrl == "" ||
      req.body.content == ""
    ) {
      return res.status(400).render("create-article", {
        errorMessage:
          "All the fields are mandatory, Please provide title, description and select an image",
      });
    }
    Article.findById(id)
      .populate("author")
      .then((articleToEdit) => {
        if (isOwner(req, articleToEdit.author.id)) {
          return Article.findByIdAndUpdate(req.params.id, blog, {
            new: true,
          });
        } else {
          console.log("Unauthorized");
          res.redirect(401, "/");
        }
      })
      .then((article) => res.redirect(`/articles/${article.id}`))
      .catch((e) => {
        console.log("error updating article", e);
        next(e);
      });
  }
);

router.get("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .populate("author")
    .then((articleToEdit) => {
      if (isOwner(req, articleToEdit.author.id)) {
        return Article.findByIdAndDelete(id);
      } else {
        console.log("Unauthorized");
        res.redirect(401, "/");
      }
    })
    .then((article) => res.redirect(`/users/${article.author._id}`))
    .catch((error) => next(error));
});
module.exports = router;
