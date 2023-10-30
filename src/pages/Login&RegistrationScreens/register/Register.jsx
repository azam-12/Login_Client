import './register.css'
import '../login/login.css'
import AppleIcon from '../../../icons/apple.png';
import GoogleIcon from '../../../icons/google.png';
import FacebookIcon from '../../../icons/fb.png';
import registerImg from "../../../img/register.png"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Link, useNavigate } from 'react-router-dom'
import { baseUrl, postRequest } from "../../../components/utils/service";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";


const Register = () => {

  const navigate = useNavigate()

  // authcontext methods
  const { setUser } = useContext(AuthContext);


  const [agreement, setAgreement] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [focused, setFocused] = useState({
    nameFocus: false,
    emailFocus: false,
    isdFocus: false,
    phoneFocus: false,
    passwordFocus: false,
  })
  const [open, setOpen] = useState(false)
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    phone: "",
    isd: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);


  const handlePasswordToggle = () => {
    setOpen(!open)
  }


  const onChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
  }

  const handleChangeAgreement = (e) => {
    setAgreement(e.target.checked);
  }


  const handleNameFocus = (e) => {
    setFocused({ ...focused, nameFocus: true })
  }


  const handleEmailFocus = (e) => {
    setFocused({ ...focused, emailFocus: true })
  }


  const handleIsdFocus = (e) => {
    setFocused({ ...focused, isdFocus: true })
  }


  const handlePhoneFocus = (e) => {
    setFocused({ ...focused, phoneFocus: true })
  }



  const handlePasswordFocus = (e) => {
    setFocused({ ...focused, passwordFocus: true })
  }


  const handleLogin = () => {
    navigate("/login")
  }



  //client validation
  const validate = (registerInfo) => {
    const errors = {};
    errors.noNameError = false;
    errors.noEmailError = false;
    errors.noIsdError = false;
    errors.noPhoneError = false;
    errors.noPasswordError = false;
    errors.noAgreementError = false;
    const regexName = /^[a-zA-Z ]*$/;
    const regexEmail = /^[^s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexIsd = /^\d{2,3}$/;
    const regexPhone = /^\d{10}$/;
    const regexPassword = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/

    if (!registerInfo.name) {
      errors.name = "Please enter Name!";
    } else if (!regexName.test(registerInfo.name)) {
      errors.name = "Name can only be alphabets with space and length between 3 to 30!";
    }
    else {
      errors.noNameError = true;
    }


    if (!registerInfo.email) {
      errors.email = "Please enter Email address!";
    } else if (!regexEmail.test(registerInfo.email)) {
      errors.email = "It is not a valid email!";
    }
    else {
      errors.noEmailError = true;
    }


    if (!registerInfo.isd) {
      errors.isd = "Please enter Country Code!";
    } else if (!regexIsd.test(registerInfo.isd)) {
      errors.isd = "In Country Code no special character allowed only 2 to 3 digit number!";
    }
    else {
      errors.noIsdError = true;
    }


    if (!registerInfo.phone) {
      errors.phone = "Please enter Mobile Number!";
    } else if (!regexPhone.test(registerInfo.phone)) {
      errors.phone = "Phone number should be 10 digit number!";
    }
    else {
      errors.noPhoneError = true;
    }


    if (!registerInfo.password) {
      errors.password = "Please enter Password!";
    } else if (!regexPassword.test(registerInfo.password)) {
      errors.password = "Password must be atleast 8 characters long and include at least an uppercase, a lowercase and a special character!";
    }
    else {
      errors.noPasswordError = true;
    }


    if (!agreement) {
      errors.agreement = "Cannot register without checking the Findme's terms and condition!";
    }
    else {
      errors.noAgreementError = true;
    }

    return errors;
  }



  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null)

    const errors = validate(registerInfo);
    if (errors.noNameError && errors.noEmailError && errors.noIsdError && errors.noPhoneError && errors.noPasswordError && errors.noAgreementError) {

      setIsRegisterLoading(true)
      try {
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false)

        if (response.error) {
          return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);

        navigate("/verify");

      } catch (error) {
        console.log('Register Page: ', error.message)
      }

    } else {
      setFormErrors(errors);
    }

  }



  return (
    <div className="loginContainer">
      <div className="loginWrapper">


        <div className="loginLeftContainer">
          <img src={registerImg} alt="" className="loginImg" />
          <span className="loginSpanText">Already Have An Account?</span>
          <p className="loginPText">We Are Happy To Have You Back</p>
          <button className="loginRegister" onClick={handleLogin}>Login</button>
        </div>


        <div className="loginRightContainer">

          <div className="registerRightWrapper">

            <div className="registerTitleContainer">
              <span className="registerRightTitle">Create Account</span>
              <span className="registerRightSubTitle">Get Started By Creating Your New Account</span>
            </div>

            <div className="loginInputContainer">
              <div className={formErrors.name ? "loginInputDiv inputInvalid" : "loginInputDiv"}>
                <input
                  type="text"
                  name='name'
                  onChange={onChange}
                  onBlur={handleNameFocus}
                  focused={focused.nameFocus.toString()}
                  value={registerInfo.name}
                  className="loginTextInput"
                  placeholder='Full Name' />
              </div>
              <span className='errorMsg'>{formErrors.name}</span>
            </div>

            <div className="loginInputContainer">
              <div className={formErrors.email ? "loginInputDiv inputInvalid" : "loginInputDiv"}>
                <input
                  type="email"
                  name='email'
                  onChange={onChange}
                  onBlur={handleEmailFocus}
                  focused={focused.emailFocus.toString()}
                  value={registerInfo.email}
                  className="loginTextInput"
                  placeholder='Email' />
              </div>
              <span className='errorMsg'>{formErrors.email}</span>
            </div>

            <div className="loginInputContainer">
              <div className={formErrors.isd ? "loginInputDiv inputInvalid" : "loginInputDiv"}     >
                <input
                  type="text"
                  name='isd'
                  onChange={onChange}
                  onBlur={handleIsdFocus}
                  focused={focused.isdFocus.toString()}
                  value={registerInfo.isd}
                  className="loginTextInput"
                  placeholder='Country Code' />
              </div>
              <span className='errorMsg'>{formErrors.isd}</span>
            </div>

            <div className="loginInputContainer">
              <div className={formErrors.phone ? "loginInputDiv inputInvalid" : "loginInputDiv"}     >
                <input
                  type="text"
                  name='phone'
                  onChange={onChange}
                  onBlur={handlePhoneFocus}
                  focused={focused.phoneFocus.toString()}
                  value={registerInfo.phone}
                  className="loginTextInput"
                  placeholder='Phone Number' />
              </div>
              <span className='errorMsg'>{formErrors.phone}</span>
            </div>

            <div className="loginInputContainer">
              <div className={formErrors.password ? "loginInputDiv inputInvalid" : "loginInputDiv"}>
                <input
                  type={open ? "text" : "password"}
                  name='password'
                  onChange={onChange}
                  onBlur={handlePasswordFocus}
                  focused={focused.passwordFocus.toString()}
                  value={registerInfo.password}
                  className="loginTextInput"
                  placeholder='Password' />
                {open ? <VisibilityIcon onClick={handlePasswordToggle} /> : <VisibilityOffIcon onClick={handlePasswordToggle} />}

              </div>
              <span className='errorMsg'>{formErrors.password}</span>
            </div>

          </div>

          <div className="checkboxContainer">
            <input
              type="checkbox"
              name="agreement"
              onChange={handleChangeAgreement} />
            <label htmlFor="" className="checkboxText">By clicking, you agree to Findme's Terms and Conditions</label>
          </div>
          <span className='errorMsg'>{formErrors.agreement}</span>


          {registerError?.error && (
            <span className='errorMsg'>{registerError?.message}</span>
          )}

          <button
            className="registerBtn"
            disabled={isRegisterLoading}
            onClick={handleRegister}>
            {isRegisterLoading ? "Creating your account..." : "Register"}
          </button>

          <div className="lineDivider">
            <div className="line"></div>
            <span className="lineText">or</span>
            <div className="line"></div>
          </div>
          <div className="socialIconContainer">
            <div className="iconContainer">
              <img src={AppleIcon} alt="" className="socialIcon" />
            </div>
            <div className="iconContainer">
              <img src={GoogleIcon} alt="" className="socialIcon" />
            </div>
            <div className="iconContainer">
              <img src={FacebookIcon} alt="" className="socialIcon" />
            </div>
          </div>
          <div className="textContainer">
            <span className="smallText">Already Have An Account?</span>
            <Link className="smallTextLink" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )


}

export default Register
