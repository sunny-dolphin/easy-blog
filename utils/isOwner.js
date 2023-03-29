const Article = require("../models/article.model");

function isOwner(req, authorId) {
  if (req.session.currentUser) {
    if (req.session.currentUser._id === authorId) {
      return true;
    }
  }
  return false;
}

module.exports = isOwner;
