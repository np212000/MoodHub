import jwt from "jsonwebtoken"; //importing JWT

export const authMIddleware = (req,res,next)=> //middleeare funtion runs before protected routes
{
  const token = req.headers.authorization; //got token from request headers //frontend will send token (authorization) here

  if(!token) return res.status(401).json({msg : "No token"}); //no token user not logged in 

  try 
  {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token (valid token,not expired, correct secret)
    req.user = decoded; //attach user data to request //now u can use req.user.id
    next(); //continue to next function
  } 
  catch (error) 
  {
    res.status(401).json({msg : "Invalid token"});
  }
};