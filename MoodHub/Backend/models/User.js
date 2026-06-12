const mongose = require('mongoose'); //importing mongoose //mongoose helps u define structure (schema) for MongoDB data

const UserSchema = new mongose.Schema({ //creating schema (bluepront) //tells mongoDB how user object should work
  username : {type : String, required : true, unique : true}, //username field must be string , no dublicate, must be provided
  password : {type : String, required : true, unique : true}, //password field //same logic as username
  email : {type : String, required : true, unique : true}  //email field //same logic as username
});

module.exports = mongose.model("user",UserSchema); //creating model, connects to MongoDB , crates users collection automatically
//let u do things like : user.find(), user.create().