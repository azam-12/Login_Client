import './verifyOtp.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

import { baseUrl, postRequest } from "../../../components/utils/service";

import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";


const VerifyOTP = () => {

  // authcontext methods at server side
  const { navigateInfo, setNavigateInfo } = useContext(AuthContext);

  const [otp, setOtp] = useState(new Array(6).fill(""));


  const [tempUser, setTempUser] = useState({
    email: null,
    otp: null,
    resendOTP: false
  });

  const [match, setMatch] = useState(true);



  const navigate = useNavigate()

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };



  useEffect(() => {
    const getTempUser = () => {
      let tempUser = localStorage.getItem("User")
      tempUser = JSON.parse(tempUser)
      // console.log("useEffect", tempUser)
      setTempUser(tempUser)
      // setTempEmail(tempUser.email)
    }
    getTempUser()

  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    tempUser.resendOTP = false

    console.log("submit", tempUser)

    let otpString = otp.toString().replaceAll(",", "");
    let tempUserOTP = tempUser.otp.toString()
    // let tempUserOTP = verifyInfo.otp.toString()

    if (tempUserOTP === otpString) {
      const response = await postRequest(`${baseUrl}/users/verify`, JSON.stringify(tempUser));
      localStorage.removeItem("User");
      localStorage.setItem("User", JSON.stringify(response));


      if (navigateInfo.navigateTo === "reset") {
        setNavigateInfo({ ...navigateInfo, navigateTo: "" })
        navigate("/reset")
      } else {
        // setUser(response);
        navigate("/dashboard")
      }

    } else {
      setMatch(false)
    }

  }



  const handleResendOTP = async (e) => {
    e.preventDefault()
    tempUser.resendOTP = true

    const response = await postRequest(`${baseUrl}/users/verify`, JSON.stringify(tempUser));
    localStorage.removeItem("User");
    localStorage.setItem("User", JSON.stringify(response));

  }




  return (
    <div className="verifyContainer container">
      <div className="verifyCard">

        <span className="verifyTitle">Verification Code</span>

        <div className="multilineText">
          <span className="verifySpanText">We have sent the verification code to</span>
          <span className="verifySpanText">your Email <b>{tempUser.email}</b></span>
        </div>

        <div className="otpInputWrapper">

          <div className="otpInputContainer">
            {otp.map((data, index) => {
              return (
                <input
                  className="otpInput"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                />
              );
            })}
          </div>
          {match ? null : (<span className='errorMsg'>OTP does not match, Please Re-Enter!</span>)}
          <button 
            className="verifyBtn" 
            onClick={handleSubmit}>Submit and Continue</button>

        </div>

        <div className="resendOtpContainer">
          <span className="verifySpanText">Did't receive an Otp?</span>
          <Link className="smallTextLink" onClick={handleResendOTP}>Resend</Link>
        </div>

      </div>
    </div>
  )
}

export default VerifyOTP
