import axios from "axios";

const Login = () => {
    const submitHandle = () => {
        const userName = document.querySelector(".login-form__username").value;
        const password = document.querySelector(".login-form__password").value;
        axios.post(
            "https://localhost:443/login",
            {
                userName: userName,
                password: password
            }
        ).then((res) => {
            console.log(res.data);
            localStorage.setItem('accessToken', res.data.accessToken);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
        document.querySelector(".login-form").style.display = "none";
        document.querySelector(".blur-screen").style.display = "none";

    };
    return (
        <div className="login-form">
            <input 
                type="text" 
                className="login-form__username" 
                placeholder="username"
                required
            />
            <input 
                type="password" 
                className="login-form__password"
                placeholder="password"
                required 
            />
            <button 
                className="login-form__btn"
                onClick={submitHandle}
            >
                Login
            </button>
        </div>
    );
}

export default Login;