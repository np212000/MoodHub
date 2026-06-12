const mongoose = require('mongoose');

const ConfessionSchema = new mongoose.Schema({
  text : {type : String, required : true}, //confesiion text
  mood : {type : String, required : true}, //mood emoji
  likes : {type : Number, default : 0},
  userId : {type : String, required : true} //anonymous random user id
},{timestamps : true}); //automatically creates createdAt and updatedAt

module.exports = mongoose.model("confession",ConfessionSchema);