const NeverHaveIEver =  require("../models/NeverHaveIEver");

const getRandomQuestion = async (req,res)=>
{
  const count = await NeverHaveIEver.countDocuments();
console.log("Question count:", count);

const random = Math.floor(Math.random() * count);

const question = await NeverHaveIEver.findOne().skip(random);

console.log("Question:", question);

res.json(question);
};

module.exports = getRandomQuestion;