import { useState } from "react"; //importing useDtate to store input values
import axios from "axios"; //importing axios used for API request (send login data to backend)
import { useNavigate, Link } from "react-router-dom"; //use to move user to another page programmatically.(without page refresh)

function Login() //Login component start
{
  const navigate = useNavigate(); //creating navigate function
  //state object for storing input data
  const [formData, setFormData] = useState({email : "", password : ""});

  //handle input change (function runs whenever user types)
  const handleChange = (e)=>
  {
    //copies old values without this other fields dissapper
    setFormData({...formData, [e.target.name] : e.target.value});
  };                           //input value updated automatically

  //login submit (runs when form submits)
  const handleSubmit = async (e)=>
  {
    e.preventDefault(); //stop page refesh
    try 
    {
      //sending post request to backend with formdata(userdetails)
      const res = await axios.post("http://localhost:5000/api/auth/login",formData);

      //save token
      localStorage.setItem("token",res.data.token); //storing JWT token in browser 
      //after page refresh token stays user remains logged in
      alert("Login Successfull");
      navigate("/"); //after login move user to home page
    } 
    catch(error)
  {
      console.log(error);

     alert(
        error.response?.data?.msg ||
        error.response?.data?.message ||
      "Login failed");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B141A]">
      <div className="bg-[#202C33] p-8 rounded-xl `w-[350px]`">
      <h1 className="text-white text-3xl mb-6 text-center">Login</h1>

      {/*when form submits run handlesubmit */}
      <form onSubmit={handleSubmit}> 
        
        {/*email input field, name value must match bcz e.target.value depends on this
        whenever user typing state update with onchange */}
        <input type="email" name = "email" placeholder="Email" onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-[#2A3942] text-white outline-none"/>
        <br></br><br></br>

        {/*password input field, name value must match bcz e.target.value depends on this
        whenever use typing state update with onchange */}
        <input type="password" name = "password" placeholder="Password" onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-[#2A3942] text-white outline-none"/>
        <br></br><br></br>
        
        {/*clicking button submit form*/}
        <button type="submit" className="w-full bg-green-500 p-3 rounded text-white font-bold">
        Login
        </button> 
        </form>
        <br></br>

        <p className="text-center mt-4 text-white">
        <Link to="/signup">New user? Signup</Link> {/* move to signup page without page refresh*/}
        </p>
        </div>
    </div>
  );
};

export default Login;
