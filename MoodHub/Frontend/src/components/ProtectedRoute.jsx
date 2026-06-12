import { Navigate } from "react-router-dom"; //impoting for navigate user

function ProtectedRoute({children}) //receives protected page here: children = <Home />
{
  const token = localStorage.getItem("token"); //checking login token

  if(!token) //if user not logged in
  {
    return <Navigate to="/login"/>; //redirects to login page
  }

  return children; //token exists allow access
};

export default ProtectedRoute;