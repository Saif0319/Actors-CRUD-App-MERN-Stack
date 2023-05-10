import { useState } from "react"
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();
    const navigate = useNavigate();


    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        await login(email, password);

        setEmail("");
        setPassword("");
        navigate("/");
        
    }


  return (
    <form className="signup-form" onSubmit={submitHandler}>
        <div className="input-container" style={{backgroundColor: "#c2f5ff"}}>
            <h1>Login</h1>
            <label htmlFor="email">Email</label>
            <input type={"text"} id={"email"} value={email} onChange={emailHandler}  />

            <label htmlFor="password">Password</label>
            <input type={"password"} id={"password"} value={password} onChange={passwordHandler} />

            <button type="submit" className="bg-green-400 w-20" disabled={isLoading}>Login</button>

            {error ? <div className="text-red-400">{error}</div>: ""}
            
        </div>
    </form>
  )
}

export default Login