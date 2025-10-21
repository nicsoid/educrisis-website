const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  content: {
    en: { title: String, content: String },
    uk: { title: String, content: String },
    ru: { title: String, content: String },
    zh: { title: String, content: String },
  },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Page", pageSchema);
