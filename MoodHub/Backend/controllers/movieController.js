const axios = require('axios'); //used to call external API
const dotenv = require('dotenv').config();

const getMoviesByMood = async(req,res)=> //function that handle reuest
{
  
  try 
  {
    const {mood} = req.query; //getting mood from Request

    let searchTerm = "";
    if(mood === "😄") searchTerm = "comedy";
    else if(mood === "😥") searchTerm = "emotional";
    else if(mood === "😍") searchTerm = "romance";
    else if(mood === "😎") searchTerm = "action";
    else searchTerm = "action";

    const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}`); //calling external api

    if(response.data.Response === "False")
    {
      return res.status(404).json({ message: "No movies found" });
    }

    res.status(200).json(response.data.Search);
  } 
  catch (error) 
  {
   res.status(500).json({message : error.message});
  }
};

module.exports = {getMoviesByMood}; //expoting fucntion