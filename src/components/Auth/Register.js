import axios from "axios";

const Register = () => {
    const submitHandle = () => {
        const userName = document.querySelector(".register-form__username").value;
        const password = document.querySelector(".register-form__password").value;
        axios.post(
            "https://18.142.227.93/register",
            {
                userName: userName,
                password: password
            }
        ).then((res) => {
            console.log(res.data);
            
        }).catch((err) => {
            console.log(err);
        });
        document.querySelector(".register-form").style.display = "none";
        document.querySelector(".blur-screen").style.display = "none";
    };
    return (
        <div className="register-form">
            <input 
                type="text" 
                className="register-form__username" 
                placeholder="username"
                required
            />
            <input 
                type="password" 
                className="register-form__password" 
                placeholder="password"
                required
            />
            <input 
                type="password" 
                className="register-form__password-confirm" 
                placeholder="confirm password"
                required
            />
            <button 
                className="register-form__btn"
                onClick={submitHandle}
            >
                Register
            </button>
        </div>
    )
}

export default Register;