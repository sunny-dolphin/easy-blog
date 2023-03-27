const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    topics: {
      type: [String],
      required: true,
      enum: ["Celebrities", "News", "Sports", "Personal", "Food"],
    },
    content: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Article = model("Article", articleSchema);

module.exports = Article;
