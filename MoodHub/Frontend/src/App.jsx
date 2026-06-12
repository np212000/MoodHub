import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movies";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
     <BrowserRouter>
    <Navbar />
    
     <Routes> 
      {/*Auth Route*/}

      <Route path = "/signup" element = {<Signup />}></Route>
      <Route path = "/login" element = {<Login />}></Route>

      {/*Main Routes*/}
      <Route path="/" element = {<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      <Route path="/movies" element = {<ProtectedRoute><Movie /></ProtectedRoute>}></Route>
      <Route path="/game" element = {<ProtectedRoute><Game /></ProtectedRoute>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
