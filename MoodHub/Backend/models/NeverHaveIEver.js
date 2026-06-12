const mongoose =  require("mongoose");

const neverHaveIEverSchema = new mongoose.Schema({
  question : {type : String, required : true},
  options : {type : [String], default : ["I Have", "I Have Not"]},
  category : {type : String}
});

module.exports = mongoose.model("NeverHaveIEver",neverHaveIEverSchema,"neverhaveiever");