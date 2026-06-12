const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  optionA : String,
  optionB : String,
  votesA : {type : Number, default : 0},
  votesB : {type : Number, default : 0}
});

module.exports = mongoose.model("question",QuestionSchema);