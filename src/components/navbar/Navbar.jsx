import "./navbar.css"
import { Link, useNavigate } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';


const Navbar = () => {

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/register")
  }

  return (
    <>
      <div className="navbar">
        <div className="navbarWrapper">

          <div className="navbarFirstWrapper">
            <div className="navbarLogoContainer">
              <DashboardIcon className="navbarDashboardIcon"/>
              <Link className="navbarLogo" >photo</Link>
            </div>
            <div className="navbarBtnContainer">
              <button className="navbarBtn bgWhite" onClick={handleLogin}>Log in</button>
              <button className="navbarBtn bgGreen" onClick={handleRegister}>Register</button>
            </div>
          </div>

          <div className="navbarSecondWrapper">
            <MenuIcon className="navbarMenuIcon" />
          </div>

        </div>
      </div>
    </>
  )
}

export default Navbar
