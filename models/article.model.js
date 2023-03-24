const { Schema, model } = require("mongoose")

const articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  topics: {
    type: [String],
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  timestamps: true,
})

const Article = model("Article", articleSchema)

module.exports = Article
