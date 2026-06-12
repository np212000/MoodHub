import React from "react";
import {Link,useLocation} from "react-router-dom";

function Navbar()
{
  const {pathname} = useLocation();

  if(pathname === "/login" || pathname === "/signup")
  {
    return null;
  }

  const linkStyle = (path)=> 
    `px-3 py-2 rounded-md ${pathname === path ? "bg-black text-blue" :
      "text-white hover:bg-indigo-500 hover:text-black outline-0"}`

  return(
    <>
    <nav className="w-full bg-[#111B21] shadow-md flex">
      <div className="max-w-4xl mx-auto flex justify-between items-center p-3">
        <div className="flex gap-5 text-xl">
      <Link to="/" className={linkStyle("/")}>Home</Link>
      <Link to="/movies" className={linkStyle("/movies")}>Movies</Link>
      <Link to = "/game" className={linkStyle("/game")}>Game</Link>
      </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;