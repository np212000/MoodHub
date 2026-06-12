const Confession = require('../models/Confession'); //importing confession Model

//creating message
const createConfession = async(req,res)=> //function handles incoming request //create
{
  console.log("POST route hit");
  console.log("Body : ",req.body);

  try //Error handling with try-catch
  {
    const {text,mood,userId} = req.body; //getting data from frontend
    const newConfession = await Confession.create({text,mood,userId}); //saveing new data into mongoDB
    console.log("Saved in DB : ",newConfession);

    //socket emit
    const io = req.app.get("io"); //get socket instance
    io.emit("newConfession",newConfession); //after saving in DB we send real time data to ALL users

    res.status(201).json(newConfession); //sending response created successfully
  } 
  catch (error) 
  {
    console.log("ERROR", error);
    res.status(500).json({message : error.message}); //sending server error
  }
}

//getting all confessions
const getConfessions = async(req,res)=> //function for fetching data //read
{
  try 
  {
    const confessions = await Confession.find().sort({createdAt : -1}); //latest first confession
    res.status(200).json(confessions); //send data to Frontend
  } 
  catch (error) 
  {
    res.status(500).json({message : error.message});
  }
}

module.exports = {createConfession,getConfessions}; //expoting functions