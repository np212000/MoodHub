const express = require('express'); //importing express
const router = express.Router(); //creates routes = mini route handler
// const {createQuestion,getQuestions,voteQuestion} = require('../controllers/questionController');
//importing questionController Function
const getRandomQuestion  = require("../controllers/questionController");

// router.post("/",createQuestion); //add new Question

router.get("/never-have-i-ever",getRandomQuestion); //fetch all questions
// router.put("/:id/vote",voteQuestion);  //update votes

module.exports = router;