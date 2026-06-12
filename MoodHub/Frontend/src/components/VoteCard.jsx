import React from "react";

function VoteCard({ question, refresh })
{
  const handleAnswer = () =>
  {
    refresh(); // load next random question
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-4">

      <h3 className="text-xl font-semibold text-center">
        {question.question}
      </h3>

      <div className="flex gap-4">

        <button
          onClick={handleAnswer}
          className="flex-1 bg-green-500 text-white p-3 rounded-lg"
        >
          {question.options[0]}
        </button>

        <button
          onClick={handleAnswer}
          className="flex-1 bg-red-500 text-white p-3 rounded-lg"
        >
          {question.options[1]}
        </button>

      </div>

      <p className="text-center text-gray-500">
        Category: {question.category}
      </p>

    </div>
  );
}

export default VoteCard;