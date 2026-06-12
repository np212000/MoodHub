import React from "react";

function ConfessionCard ({text,mood,userId}) //data comes from parent Home.jsx through props
{
  return (
    <div className="card" 
    className = "bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
      <p className="text" 
      className = "text-gray-700 text-sm">{text}</p> {/* confession text */}
      <span className="mood" className = "text-2xl">{mood}</span> {/* confession mood/emoji */}
      <h4>{userId}</h4>
    </div>
  );
}

export default ConfessionCard;