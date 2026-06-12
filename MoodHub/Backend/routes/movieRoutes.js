const express = require('express'); //importing express
const router = express.Router(); //creates Router = mini route handler
const {getMoviesByMood} = require('../controllers/movieController'); //importing MovieController Function

router.get("/",getMoviesByMood); //Creating Route

module.exports = router; //Expoting router