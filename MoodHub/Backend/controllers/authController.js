const bcrypt =  require("bcryptjs"); //importing password hashing library //never store real passwords
const jwt = require("jsonwebtoken"); //importing JWT library //creates login tokens
const UserSchema =  require("../models/User"); //importing user model so u can access database
const User = require("../models/User");

//SIGNUP
module.exports.signup = async (req,res) => //function that handles signup request runs when user hits /signup
{
  const {username, email, password} = req.body; //extracting data from request

  try 
  {
    //check if user exists
    const existingUser = await User.findOne({$or : [{email }, {username}]}); //search in DB for existing email or username

    if(existingUser) //stop execution //prevents duplicate accounts
    {
      return res.status(400).json({msg : "User already exists"});
    }

    //hash password
    const hashedPasswords = await bcrypt.hash(password, 10); //hashing password 10 = salt rounds(encryption strength)

    //create user
    await User.create({username, email, password : hashedPasswords}); //create new user and store in DB

    res.json({msg : "Signup successfull"});
  } 
  catch (error) 
  {
    res.status(500).json(error);
  }
};

//LOGIN
module.exports.login = async (req,res)=> //function for handling login request
{
  const {email,password} = req.body; //extracting data from request

  try
  {
    const user = await User.findOne({email}); //finds use by email

    if(!user) //user not found stop
    {
      return res.status(400).json({msg : "Invalid email"});
    }

    const isMatch = await bcrypt.compare(password, user.password); //compare password input password = DB password bcrypt checks if they match

    if(!isMatch) //wrong password stop
    {
      return res.status(400).json({msg : "wrong password"});
    }

    //create JWT token //this token proves user is logged in //used in future requests
    const token = jwt.sign(
      {id : user._id}, //payload (data indide token)
      process.env.JWT_SECRET, //secret key (for security)
      {expiresIn : "7d"} //token validation 7 days
    );

    res.json({token}); //send token to frontend //frontend sotores it used later
  }

  catch(err)
  {
    res.status(500).json(err);
  }
};