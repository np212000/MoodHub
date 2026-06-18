const connectDB = require( "./config/db");
const express = require('express');
const app = express(); //create app
const dotenv  = require('dotenv').config(); //load dotenv file
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const confessionRoutes = require('./routes/confessionRoutes'); //importing Confession Router
const movieRoutes = require('./routes/movieRoutes'); //importing movieRouter
const questionRoutes = require('./routes/questionRoutes'); //importing QuestionRouter
const authRoutes  = require("./routes/authRoutes.js");


app.use(cors()); //allows frontend to connect
app.use(express.json()); //parse JSON body without this req.body will be undefined

//routes
app.get("/", (req, res) => {
  res.send("MoodHub Backend Running 🚀");
});
app.use("/api/auth", authRoutes); //all routes start with so actual endpoints /api/auth/signup & /api/auth/login
app.use("/api/confessions",confessionRoutes);
app.use("/api/movies",movieRoutes);
app.use("/api/questions",questionRoutes);




//creating http server
const server = http.createServer(app); //socket.io needs raw http server

//socket server
const io = new Server(server, //creates realtime socket server
  {
    cors : {origin : "*"}, //allow fronted to connet
    methods: ["GET", "POST"],
  });

//online users count
let onlineUsers = 0;

//socket connection
io.on('connection',(socket)=>
{
  onlineUsers++; //increase users
  console.log("user connected",socket.id);
  // socket.emit("onlineUsers",onlineUsers);
  io.emit("onlineUsers",onlineUsers); //send online user count

  socket.on("getUsers", () => {
  socket.emit("onlineUsers", onlineUsers);
  });
  //typing event
  socket.on("typing",(userId)=>
  {
    //sends event to evertone except sender ex. used for typing...
    socket.broadcast.emit("showTyping",userId);
  });

  socket.on("sendConfession",(data)=>
  {
    io.emit("newConfession",data);
  });

  //socket disconnection
  socket.on("disconnect",()=>
  {
    onlineUsers--;
    io.emit("onlineUsers",onlineUsers);
    console.log("User Disconnected");
  });
});

//make io accessible everywhere
app.set("io",io); //use socket in controller


//connect DB + Start server
console.log("MONGO_URL exists:", !!process.env.MONGO_URL);

console.log(
  "MONGO_URL starts with:",
  process.env.MONGO_URL?.slice(0, 25)
);
mongoose.connect(process.env.MONGO_URL) //connect to databse
.then(()=> //success msg
{
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
})
.catch(err => console.log(err)); //error handling