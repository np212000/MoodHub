import React from "react";
import { useEffect,useState } from "react";
import API from "../services/api";
import VoteCard from "../components/VoteCard";

function Game()
{
  const [question,setQuestion] = useState(null);

  //fetching All the Questions
  const fetchQuestions = async()=>
  {
    try 
    {
     const res = await API.get("/questions/never-have-i-ever");
     console.log("API Response:", res.data);
     setQuestion(res.data); 
    } 
    catch (error) 
    {
      console.log(error);
    }
  };
  //Fetched Questions loades when screen loads
  useEffect(()=>
  {
    fetchQuestions();
  },[]);
  return(
    <>
    <div className="min-h-screen bg-gray-100 p-5 flex justify-center">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Never Have I Ever 🤔
        </h2>

        <div className="space-y-4">
       {question && (
        <VoteCard
          key={question._id}
          question={question}
        refresh={fetchQuestions}
        />
  )}
</div>

      </div>

    </div>
    </>
  );
}

export default Game;