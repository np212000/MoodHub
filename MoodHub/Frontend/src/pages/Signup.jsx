import { useState } from "react"; //importing useDtate to store input values
import axios from "axios"; //importing axios used for API request (send signup data to backend)
import { useNavigate, Link } from "react-router-dom"; //use to move user to another page programmatically.(without page refresh)

function Signup() //signup component start
{
  const navigate = useNavigate(); //creating navigate function
  //state object for storing input data
  const [formData, setFormData] = useState({username : "", email : "", password : ""});

  //handle input change (function runs whenever user types)
  const handleChange = (e) =>
  {
    //copies old values without this other fields dissapper
    setFormData({...formData, [e.target.name] : e.target.value}); //updating state
  };                           //input value updated automatically

  //signup submit (runs when form submits)
  const handleSubmit = async (e)=>
  {
    e.preventDefault(); //stop page refesh
    try 
    {
      //sending post request to backend with formdata(userdetails)
      const res = await axios.post("https://moodhub-api.onrender.com/api/auth/signup",formData);
      alert(res.data.msg); //shows backend success message
      navigate("/login"); //after signup move user to login page
    } 
    catch (error)
{
  console.log(error);

  alert(
    error.response?.data?.msg ||
    error.message ||
    "Something went wrong"
  );
}
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-[#0B141A]">
      <div className="bg-[#202C33] p-8 rounded-xl `w-[350px]`">
      <h1 className="text-white text-3xl mb-6 text-center">Signup</h1>

        {/*when form submits run handlesubmit */}
        <form onSubmit={handleSubmit}> 
        
        {/*username input field, name value must match bcz e.target.value depends on this
        whenever user typing state update with onchange */}
        <input type="text" name = "username" placeholder="Username" onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-[#2A3942] text-white outline-none"/>
        <br></br><br></br> 
        
        {/*email input field, name value must match bcz e.target.value depends on this
        whenever user typing state update with onchange */}
        <input type="email" name = "email" placeholder="Email" onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-[#2A3942] text-white outline-none"/>
        <br></br><br></br>
        
        {/*password input field, name value must match bcz e.target.value depends on this
        whenever use typing state update with onchange */}
        <input type="password" name="password" placeholder="Password" onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-[#2A3942] text-white outline-none"/>
        <br></br><br></br>
        
        {/*clicking button submit form*/}
        <button type="submit" className="w-full bg-green-500 p-3 rounded text-white font-bold">
        Signup  
        </button>

      </form>
      <br></br>
      
      <p className="text-center mt-4 text-white">
      <Link to="/login">Already have account ? Login</Link> {/* move to login page without page refresh*/}
      </p>
      </div>
    </div>
  );

}

export default Signup;

