import Login from "./Login";
import Register from "./Register";
import styles from '../../assets/css/auth.css';

const Auth = () => {
    const handleRegister = (e) => {
        document.querySelector(".auth-form").style.display = "none";
        document.querySelector(".login-form").style.display = "none";
        document.querySelector(".register-form").style.display = "flex";
        document.querySelector(".blur-screen").style.display = "flex";
    }

    const handleLogin = (e) => {
        document.querySelector(".auth-form").style.display = "none";
        document.querySelector(".register-form").style.display = "none";
        document.querySelector(".login-form").style.display = "flex";
        document.querySelector(".blur-screen").style.display = "flex";
    }

    return (
        <div className="auth-form">
            <button className="form-auth__register" onClick={handleRegister}>Register</button>
            <button className="form-auth__login" onClick={handleLogin}>Login</button>
        </div>
    )
}

export { Login, Register };
export default Auth;