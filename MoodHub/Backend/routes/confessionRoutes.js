const express = require('express'); //impoting express
const router = express.Router(); //creating router Router = mini app for routes
const {createConfession,getConfessions} = require('../controllers/confessionController'); //impoting Controller and their function

router.post("/",createConfession); //creating Confession Route send will take text + mood
router.get("/",getConfessions); //creating get confesiion Route (gets all confession)

module.exports = router; //exporting Router