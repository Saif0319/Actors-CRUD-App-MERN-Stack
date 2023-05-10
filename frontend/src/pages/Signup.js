import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();


    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        await signup(email, password);

        setEmail("");
        setPassword("");
        navigate("/");
    }


  return (
    <form className="signup-form" onSubmit={submitHandler}>

        <div className="input-container">
            <h1>Signup</h1>
            
            <label htmlFor="email">Email</label>
            <input type={"text"} id={"email"} value={email} onChange={emailHandler} />

            <label htmlFor="password">Password</label>
            <input type={"password"} id={"password"} value={password} onChange={passwordHandler} />

            <button type="submit" className="bg-green-400 w-20" disabled={isLoading}>Signup</button>

            {error ? <div className="text-red-400">{error}</div>: ""}

            
        </div>
        
    </form>
  )
}

export default Signup