import { useEffect } from "react";
import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [navigateInfo, setNavigateInfo] = useState({
        navigateTo: "",
    });



    // useEffect(() => {
    //     const user = localStorage.getItem("User");

    //     setUser(JSON.parse(user));
    // }, []);


    const [token, setToken] = useState('')
    const [otp, setOTP] = useState('')

    useEffect(() => {
        const user = localStorage.getItem("User");
        if (user?.otp) {
            console.log("OTP present")
            setOTP(user.otp)
        }
        if (user?.token) {
            console.log("token present")
            setToken(user.token)
        }
        console.log("na present")

    }, []);



    const logoutUser = () => {
        localStorage.removeItem("User");
        setUser(null);
    }



    const updateUser = useCallback((response) => {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [])



    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                navigateInfo,
                setNavigateInfo,
                logoutUser,

                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );



};
