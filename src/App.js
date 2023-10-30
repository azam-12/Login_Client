import './App.css';
import { Routes, Route } from "react-router-dom"
import Register from "./pages/Login&RegistrationScreens/register/Register"
import Login from "./pages/Login&RegistrationScreens/login/Login"
import Dashboard from "./pages/Login&RegistrationScreens/dashboard/Dashboard"
import VerifyOTP from "./pages/Login&RegistrationScreens/verifyOTP/VerifyOTP"
import Forgot from "./pages/Login&RegistrationScreens/forgot/Forgot"
import Reset from "./pages/Login&RegistrationScreens/reset/Reset"

import Home from "./pages/home/Home"
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";



function App() {

  const { user } = useContext(AuthContext);
  const [token, setToken] = useState('')
  const [otp, setOTP] = useState('')


  // User is a localstorage user with OTP
  // user is AuthContext user with token

  useEffect(() => {
    const User = localStorage.getItem("User");
    if(User?.otp){
      console.log("OTP present")
      setOTP(User.otp)
    }
    if(user?.token){
      console.log("token present")
      setToken(user.token)
    }
    console.log("na present")

}, []);


  // useEffect(() => {
  //   if(user?.token){
  //     setToken(user.token)
  //   }
  //   if(user?.otp){
  //     setOTP(user.otp)
  //   }
  // }, [])


  return (
    <>
      {/* <Header/> */}

      {/* Trying for protected routes */}
      {/* <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/reset' element={otp ? <Reset /> : <Login />} />
        <Route path='/verify' element={otp ? <VerifyOTP /> : <Login /> } />
        <Route path='/register' element={token ? <Home /> : <Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Login /> } />
      </Routes> */}

      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/verify' element={<VerifyOTP />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </>
  );
}

export default App;
