import './reset.css'
import '../login/login.css'
import ForgotImg from "../../../img/forgot.png"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { baseUrl, postRequest } from "../../../components/utils/service";



const Reset = () => {

    const navigate = useNavigate()





    const [open, setOpen] = useState(false)
    const [cpopen, setCpopen] = useState(false)



    // authcontext methods at server side
    const { setUser } = useContext(AuthContext);


    const [jsonMessage, setJsonMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [focused, setFocused] = useState({
        emailFocus: false,
        passwordFocus: false,
        cPasswordFocus: false,
    })
    const [resetError, setResetError] = useState(null);
    const [isResetLoading, setIsResetLoading] = useState(false);
    const [resetInfo, setResetInfo] = useState({
        email: "",
        password: "",
        cPassword: "",
    });



    const onChange = (e) => {
        setResetInfo({ ...resetInfo, [e.target.name]: e.target.value })
    }


    const handleCpasswordToggle = () => {
        setCpopen(!cpopen)
    }


    const handlePasswordToggle = () => {
        setOpen(!open)
    }


    const handleEmailFocus = (e) => {
        setFocused({ ...focused, emailFocus: true })
    }


    const handlePasswordFocus = (e) => {
        setFocused({ ...focused, passwordFocus: true })
    }


    const handleCpasswordFocus = (e) => {
        setFocused({ ...focused, cPasswordFocus: true })
    }


    //client validation
    const validate = (resetInfo) => {
        const errors = {};
        errors.noEmailError = false;
        errors.noPasswordError = false;
        errors.noCpasswordError = false;
        const regexEmail = /^[^s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPassword = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/


        if (!resetInfo.email) {
            errors.email = "Please enter Email address!";
        } else if (!regexEmail.test(resetInfo.email)) {
            errors.email = "It is not a valid email!";
        }
        else {
            errors.noEmailError = true;
        }


        if (!resetInfo.password) {
            errors.password = "Please enter Password!";
        } else if (!regexPassword.test(resetInfo.password)) {
            errors.password = "Password must be atleast 8 characters long and include at least an uppercase, a lowercase and a special character!";
        }
        else {
            errors.noPasswordError = true;
        }


        if (!resetInfo.cPassword) {
            errors.cPassword = "Please enter Confirm Password!";
        } else if (resetInfo.password !== resetInfo.cPassword) {
            errors.cPassword = "Confirm Password does not match Password!";
        }
        else {
            errors.noCpasswordError = true;
        }


        return errors;
    }


    const handleReset = async (e) => {
        e.preventDefault();
        setResetError(null)

        const errors = validate(resetInfo);
        if (errors.noEmailError && errors.noPasswordError && errors.noCpasswordError) {
            setIsResetLoading(true)
            // reset password and display message do not navigate anywhere
            try {
                const response = await postRequest(`${baseUrl}/users/reset`, JSON.stringify(resetInfo));
                setIsResetLoading(false);

                if (response.error) {
                    return setResetError(response);
                }

                setJsonMessage(response.message)
                localStorage.removeItem("User");
                setUser(null);

            } catch (error) {
                console.log('Forgot Page: ', error.message)
            }

        } else {
            setFormErrors(errors);
        }
    }


    const handleLogin = () => {
        navigate("/login")
    }


    return (
        <div className="forgotContainer container">
            <div className="forgotWrapper">

                <div className="forgotLeftContainer">
                    <img src={ForgotImg} alt="" className="resetImg" />
                    <span className="loginSpanText">Continue Login!</span>
                    <p className="loginPText">We Are Happy To Have You Back</p>
                    <button className="loginRegister" onClick={handleLogin}>Login</button>
                </div>

                <div className="forgotRightContainer">
                    <div className="forgotRightWrapper">

                        <span className="forgotTitle">Reset Your Password</span>

                        <div className="multilineText">
                            <span className="forgotSpanText">Enter Your Registered Email</span>
                            <span className="forgotSpanText">And Set A New Password</span>
                        </div>



                        <div className="resetWidgets">
                            <div className="inputDivWrapper">
                                <div className="forgotInputDiv">
                                    <input
                                        type="text"
                                        name='email'
                                        onChange={onChange}
                                        onBlur={handleEmailFocus}
                                        focused={focused.emailFocus.toString()}
                                        value={resetInfo.email}
                                        className="loginTextInput"
                                        placeholder='Email' />
                                </div>
                                <span className='errorMsg'>{formErrors.email}</span>
                            </div>

                            <div className="inputDivWrapper">
                                <div className="forgotInputDiv">
                                    <input
                                        type={open ? "text" : "password"}
                                        name='password'
                                        onChange={onChange}
                                        onBlur={handlePasswordFocus}
                                        focused={focused.passwordFocus.toString()}
                                        value={resetInfo.password}
                                        className="loginTextInput"
                                        placeholder='New Password' />
                                    {open ? <VisibilityIcon onClick={handlePasswordToggle} /> : <VisibilityOffIcon onClick={handlePasswordToggle} />}
                                </div>
                                <span className='errorMsg'>{formErrors.password}</span>
                            </div>

                            <div className="inputDivWrapper">
                                <div className="forgotInputDiv">
                                    <input
                                        type={cpopen ? "text" : "password"}
                                        name='cPassword'
                                        onChange={onChange}
                                        onBlur={handleCpasswordFocus}
                                        focused={focused.cPasswordFocus.toString()}
                                        value={resetInfo.cPassword}
                                        className="loginTextInput"
                                        placeholder='Confirm Password' />
                                    {cpopen ? <VisibilityIcon onClick={handleCpasswordToggle} /> : <VisibilityOffIcon onClick={handleCpasswordToggle} />}
                                </div>
                                <span className='errorMsg'>{formErrors.cPassword}</span>
                            </div>

                            {jsonMessage && (<span className='successMsg'>{jsonMessage}</span>)}

                            {resetError?.error && (
                                <span className='errorMsg'>{resetError?.message}</span>
                            )}

                            <button
                                className="forgotBtn"
                                disabled={isResetLoading}
                                onClick={handleReset}>
                                {isResetLoading ? "Resetting Password..." : "Reset"}
                            </button>
                        </div>





                    </div>
                </div>

            </div>
        </div>
    )
}

export default Reset
