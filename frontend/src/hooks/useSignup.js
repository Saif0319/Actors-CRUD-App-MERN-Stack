import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(false);

        await axios.post("https://mern-actors-app.onrender.com/users/signup", {
            email,
            password
        })
        .then(res => {
            localStorage.setItem("user", res.data.token);
            dispatch({
                type: "LOGIN",
                payload: res.data
            });
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.response.data.error);
        })
    }


  return {
    signup, error, isLoading
  }
} 