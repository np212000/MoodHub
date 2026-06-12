import React from "react";
import { useEffect,useState } from "react";
import ConfessionCard from "../components/ConfessionCard";
import API from "../services/api";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io("http://localhost:5000");

function Home()
{
 
  const [confession, setConfession] = useState([]); //stores all confessions in state
  const [text,setText] = useState(""); //stores input text in state
  const [mood,setMood] = useState("😄"); //stores input mood in state 
  const [onlineUsers,setOnlineUsers] = useState(null); //stores online users
  const [typingUser,setTypingUsser] = useState(""); //stores typing users

  //generate random anonymous id
  let currentUserId = localStorage.getItem("userId");

if (!currentUserId) {
  currentUserId = "User-" + crypto.randomUUID().slice(0, 5);
  localStorage.setItem("userId", currentUserId);
}

  const moods = ["😄", "😢", "😍", "😠", "😎"]; //emojis

//fetch old messages
const fetchMessages = async ()=>
{
  const res = await axios.get("http://localhost:5000/api/confessions");
  setConfession(res.data);
};

//realtime listener
//whenever backend emits frontend listens updates UI instantly
  useEffect(()=> //fetching data when screen loads
  {
    const loadMessages = async () => {
    await fetchMessages();
  };

    loadMessages();

    socket.emit("getUsers");
    //receive new message
    socket.on("newConfession",(data)=>
    {
      setConfession(prev => [data,...prev]);
    });

    //online users
    const handleUsers = (count) => 
    {
      setOnlineUsers(count);
    };

    socket.on("onlineUsers", handleUsers);


    //typing indicator
    socket.on("showTyping",(userId)=>
    {
      setTypingUsser(userId);
      setTimeout(()=>
      {
        setTypingUsser("");
      },2000);
    });
    return ()=>
    {
      socket.off("newConfession");
      socket.off("onlineUsers");
      socket.off("showTyping");
    };
    
  },[]); 

  const handleSubmit = async (e) =>
{
  e.preventDefault();

  if(!text.trim()) return;

  try
  {
    await axios.post(
      "http://localhost:5000/api/confessions",
      {
        text,
        mood,
        userId: currentUserId
      }
    );

    setText("");
    setMood("😄");

  }
  catch(error)
  {
    console.log(error);
  }
};

  return (
    <>
     <div className="bg-[#111B21] min-h-screen flex flex-col">
      {/*Top Bar */}
      <div className="bg-[#546e7a] p-4 flex justify-between items-center shadow">

        <div>
          <h1 className="text-white text-xl font-bold">
            MoodHub Chat
          </h1>

          <p className="text-green-400 text-sm">
            {onlineUsers} Online
          </p>
        </div>

      </div>

      {/*Chat Area*/}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse gap-3">
        {confession.map((item)=>(
          <div key={item._id}
          className={`max-w-[75%] p-3 rounded-xl text-white shadow
         ${item.userId === currentUserId
          ? "bg-[#005C4B] self-end"
          : "bg-[#202C33] self-start"
        }`}> 

          {/*user id*/}
          <p className="text-xs text-gray-300 mb-1">
            {item.userId}
          </p>

          {/*message */}
          <p className="text-xl text-white mb-1">{item.text}</p>

          {/*mood */}
          <span className="text-xl">{item.mood}</span>

          </div>
        ))}

      </div>

      {/*typing*/}
      <p className="text-gray-400 px-4 h-6">
        {typingUser && `${typingUser} is Typing...`}
      </p>

      {/*Input Area*/}
      <div className="bg-[#202C33] p-3 flex gap-2">

        {/*emojis*/}
        <select value={mood} onChange={(e)=>setMood(e.target.value)}
        className="bg-[#2A3942] text-white p-2 rounded outline-none">
          {moods.map((emoji)=>(
            <option key={emoji} value = {emoji}>{emoji}</option>
          ))}

        </select>
        
        {/*input*/}
        <input type="text" value={text} placeholder="Type a message..."
        onChange={(e)=>{setText(e.target.value); socket.emit("typing", currentUserId);}}
        className="flex-1 bg-[#2A3942] text-white p-3 rounded-full outline-none"/>

        {/*send button*/}
        <button onClick = {handleSubmit} 
        className="bg-[#00A884] text-white px-5 outline-none font-semibold text-xl
        rounded-full flex-col">
          Send
        </button>

      </div>

     </div>
    </>
  );
}
export default Home;