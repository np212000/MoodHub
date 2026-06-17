import axios from "axios";

const API = axios.create({
  baseURL : "https://moodhub-api.onrender.com/api"  //backend URL //connects frontend to backend
});

export default API;