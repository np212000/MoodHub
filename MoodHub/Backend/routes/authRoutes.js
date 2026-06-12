const express = require("express"); //importing express
const {signup, login} = require("../controllers/authController"); //imporing function from authcontroller

const router = express.Router(); //creates router objects

router.post("/signup", signup); //when request comes to /signup run signup function
router.post("/login", login); //when request comes to /login run login function

module.exports = router; //exporting router