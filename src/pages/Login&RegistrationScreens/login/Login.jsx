import "./login.css"
import loginImg from "../../../img/login.png"
import AppleIcon from '../../../icons/apple.png';
import GoogleIcon from '../../../icons/google.png';
import FacebookIcon from '../../../icons/fb.png';
import EmailIcon from '../../../icons/email.png';
import LockIcon from '../../../icons/password.png';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { baseUrl, postRequest } from "../../../components/utils/service";



const Login = () => {

    const navigate = useNavigate()

    // authcontext methods
    const { setUser } = useContext(AuthContext);


    // client side validation variables
    const [formErrors, setFormErrors] = useState({});
    const [focused, setFocused] = useState({
        emailFocus: false,
        passwordFocus: false,
    })
    const [open, setOpen] = useState(false)
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });


    const handlePasswordToggle = () => {
        setOpen(!open)
    }


    const onChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }


    const handleEmailFocus = (e) => {
        setFocused({ ...focused, emailFocus: true })
    }


    const handlePasswordFocus = (e) => {
        setFocused({ ...focused, passwordFocus: true })
    }


    //client validation
    const validate = (loginInfo) => {
        const errors = {};
        errors.noEmailError = false;
        errors.noPasswordError = false;
        const regexEmail = /^[^s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPassword = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/


        if (!loginInfo.email) {
            errors.email = "Please enter Email address!";
        } else if (!regexEmail.test(loginInfo.email)) {
            errors.email = "It is not a valid email!";
        }
        else {
            errors.noEmailError = true;
        }


        if (!loginInfo.password) {
            errors.password = "Please enter Password!";
        } else if (!regexPassword.test(loginInfo.password)) {
            errors.password = "Password must be atleast 8 characters long and include at least an uppercase, a lowercase and a special character!";
        }
        else {
            errors.noPasswordError = true;
        }

        return errors;
    }


    const handleRegister = () => {
        navigate("/register")
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginError(null)

        const errors = validate(loginInfo);
        //If there is any client side error then we set it in else part or go for server validation 
        if (errors.noEmailError && errors.noPasswordError) {

            setIsLoginLoading(true);

            try {
                const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));

                
                setIsLoginLoading(false);

                //If we receive any error from server we return and set it or else login user 
                if (response.error) {
                    
                    return setLoginError(response);
                }

                // we dont want to display client side errors while we have server side error 
                // setFormErrors(null)
                

                localStorage.setItem("User", JSON.stringify(response));
                setUser(response);

                navigate("/verify");

            } catch (error) {
                console.log('Login Page: ', error.message)
            }
        } else {
            setFormErrors(errors);
        }
    }




    return (
        <div className="loginContainer container">
            <div className="loginWrapper ">
                <div className="loginLeftContainer ">
                    <img src={loginImg} alt="" className="loginImg" />
                    <span className="loginSpanText">Don't Have An Account?</span>
                    <p className="loginPText">Get Started By Creating Your New Account</p>
                    <button className="loginRegister" onClick={handleRegister}>Register</button>
                </div>
                <div className="loginRightContainer ">
                    <div className="loginRightWrapper">
                        <span className="loginRightTitle">Hello! Welcome Back</span>
                        <div className="loginInputContainer ">
                            <label htmlFor="email" className="labelText">Email</label>
                            <div className={formErrors.email ? "loginInputDiv inputInvalid" : "loginInputDiv"}>
                                <img src={EmailIcon} alt="" className="inputIcon" />
                                <input
                                    type="email"
                                    name='email'
                                    onChange={onChange}
                                    onBlur={handleEmailFocus}
                                    focused={focused.emailFocus.toString()}
                                    value={loginInfo.email}
                                    className="loginTextInput" />
                            </div>
                            <span className='errorMsg'>{formErrors.email}</span>
                        </div>
                        <div className="loginInputContainer">
                            <label htmlFor="password" className="labelText">Password</label>
                            <div className={formErrors.password ? "loginInputDiv inputInvalid" : "loginInputDiv"}>
                                <img src={LockIcon} alt="" className="inputIcon" />
                                <input
                                    type={open ? "text" : "password"}
                                    name='password'
                                    onChange={onChange}
                                    onBlur={handlePasswordFocus}
                                    focused={focused.passwordFocus.toString()}
                                    value={loginInfo.password}
                                    className="loginTextInput" />
                                {open ? <VisibilityIcon onClick={handlePasswordToggle} /> : <VisibilityOffIcon onClick={handlePasswordToggle} />}
                            </div>
                            <span className='errorMsg'>{formErrors.password}</span>
                        </div>
                    </div>
                    <div className="forgotLinkContainer">
                        <Link className="forgotLink" to="/forgot">Forgot Password!</Link>
                    </div>

                    {loginError?.error && (
                        <span className='errorMsg'>{loginError?.message}</span>
                    )}

                    <button
                        className="loginBtn"
                        disabled={isLoginLoading}
                        onClick={handleLogin}>
                        {isLoginLoading ? "Loggin In..." : "Login"}
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
                        <span className="smallText">Don't Have An Account?</span>
                        <Link className="smallTextLink" to="/register">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
