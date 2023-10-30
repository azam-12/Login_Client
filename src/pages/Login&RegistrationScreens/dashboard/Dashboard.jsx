import "./dashboard.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";



const Dashboard = () => {

  const navigate = useNavigate()

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const { setUser, logoutUser } = useContext(AuthContext);


  const handleLogout = () => {
    setIsLogoutLoading(true)
    logoutUser()
    setUser(null)
    setIsLogoutLoading(false)
    navigate("/login")
  }

  
  return (
    <div>
      <h1>Dashboard</h1>
      <button
            className="registerBtn"
            disabled={isLogoutLoading}
            onClick={handleLogout}>
            {isLogoutLoading ? "Logging you out..." : "Logout"}
          </button>
    </div>
  )
}

export default Dashboard
