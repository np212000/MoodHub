const NeverHaveIEver =  require("../models/NeverHaveIEver");

const getRandomQuestion = async (req,res)=>
{
  try 
  {
    const count = await NeverHaveIEver.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await NeverHaveIEver.findOne().skip(random);

    res.json(question);
  } 
  catch (error) 
  {
    res.status(500).json({message : error.message});
  }
};

module.exports = getRandomQuestion;