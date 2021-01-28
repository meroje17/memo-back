const mongoose = require("mongoose");

const topPlayerSchema = mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("topPlayer", topPlayerSchema);
