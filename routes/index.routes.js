const express = require("express");
const router = express.Router();
const articleList = require("../utils/articleList");
/* GET home page */
router.get("/", (req, res, next) => {
  articleList(req)
    .then((articles) => {
      res.render("index", { articles });
    })
    .catch((err) => next(err));
});

module.exports = router;
