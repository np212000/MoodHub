import React from "react";
import { useState } from "react";
import API from "../services/api";

function Movie()
{
  const [movies,setMovies] = useState([]);
  const [mood,setMood] = useState("");
  const [loading,setLoading] = useState(false);

  const moods = ["😄","😥","😍","😠","😎"];

  //fethcing movies based on moods
  const fetchMovies = async (selectedMood) =>
  {
    setMood(selectedMood);
    setLoading(true);

    try 
    {
      const res = await API.get(`movies?mood=${encodeURIComponent(selectedMood)}`);
      setMovies(res.data);
    } 
    catch (error) 
    {
      console.log(error);
    }

    setLoading(false);
  }
  return(
    <>
    <div className="min-h-screen bg-gray-100 p-5 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Movie Recomendations
        </h2>

        {/**mood buttons */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {moods.map((m)=>(
            <button key={m} onClick={()=>fetchMovies(m)}
            className={`px-4 py-2 rounded-md ${mood === m ? "bg-black text-white" :
              "bg-white shadow"
             }`}>
              {m}
            </button>
          ))}

        </div>
        {loading && <p className="text-center">Loading...</p>} {/*Loading */}

        {/**Movies grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {movies?.map((movie)=>(
            <div key={movie.imdbID}
            className="bg-white rounded-xl shadow-md p-2">

              <img src={movie.Poster} alt={movie.Title}
              className="w-full h-60 object-cover rounded-md" />

              <h3 className="text-sm font-semibold mt-2">
                {movie.Title}
              </h3>

              <p className="text-xs text-gray-500">
                {movie.Year}
              </p>
              
            </div>
          ))}

        </div>

      </div>

    </div>
    </>
  )
}

export default Movie;