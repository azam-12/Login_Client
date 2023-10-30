import './forgot.css'
import '../login/login.css'
import ForgotImg from "../../../img/forgot.png"

import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { baseUrl, postRequest } from "../../../components/utils/service";



const Forgot = () => {

    // authcontext methods
    const { setUser, setNavigateInfo, navigateInfo } = useContext(AuthContext);

    const navigate = useNavigate()

    const [formErrors, setFormErrors] = useState({});
    const [focused, setFocused] = useState({
        emailFocus: false,
    })
    const [forgotError, setForgotError] = useState(null);
    const [isForgotLoading, setIsForgotLoading] = useState(false);
    const [forgotInfo, setForgotInfo] = useState({
        email: "",
    });

    const onChange = (e) => {
        setForgotInfo({ ...forgotInfo, [e.target.name]: e.target.value })
    }


    const handleEmailFocus = (e) => {
        setFocused({ ...focused, emailFocus: true })
    }



    //client validation
    const validate = (registerInfo) => {
        const errors = {};
        errors.noEmailError = false;
        const regexEmail = /^[^s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!registerInfo.email) {
            errors.email = "Please enter Email address!";
        } else if (!regexEmail.test(registerInfo.email)) {
            errors.email = "It is not a valid email!";
        }
        else {
            errors.noEmailError = true;
        }

        return errors;
    }



    const handleForgot = async (e) => {
        e.preventDefault();
        setForgotError(null)

        const errors = validate(forgotInfo);
        if (errors.noEmailError) {
            setIsForgotLoading(true)
            try {
                const response = await postRequest(`${baseUrl}/users/forgot`, JSON.stringify(forgotInfo));

                setIsForgotLoading(false);

                if (response.error) {
                    return setForgotError(response);
                }

                localStorage.setItem("User", JSON.stringify(response));
                setUser(response);
                setNavigateInfo({ ...navigateInfo, navigateTo: "reset" })
                navigate("/verify");
            } catch (error) {
                console.log('Forgot Page: ', error.message)
            }

        } else {
            setFormErrors(errors);
        }
    }


    return (
        <div className="forgotContainer container">
            <div className="forgotWrapper">

                <div className="forgotLeftContainer">
                    <img src={ForgotImg} alt="" className="forgotImg" />
                </div>

                <div className="forgotRightContainer ">
                    <div className="forgotRightWrapper ">

                        <span className="forgotTitle">Forgot Your Password?</span>

                        <div className="multilineText">
                            <span className="forgotSpanText">Enter Your Registered Email</span>
                            <span className="forgotSpanText">And Set A New Password</span>
                        </div>

                        <div className="bottomWidgets">
                            <div className="inputDivWrapper">
                                <div className="forgotInputDiv">
                                    <input
                                        type="text"
                                        name='email'
                                        onChange={onChange}
                                        onBlur={handleEmailFocus}
                                        focused={focused.emailFocus.toString()}
                                        value={forgotInfo.email}
                                        className="loginTextInput"
                                        placeholder='Email' />
                                </div>
                                <span className='errorMsg'>{formErrors.email}</span>
                            </div>


                            {forgotError?.error && (
                                <span className='errorMsg'>{forgotError?.message}</span>
                            )}

                            <button
                                className="forgotBtn"
                                onClick={handleForgot}>{isForgotLoading ? "Sending Code..." : "Send Code"}</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Forgot
