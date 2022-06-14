const BlurScreen = () => {
    const handleClick = (e) => {
        e.target.style.display = "none";
        document.querySelector(".auth-form").style.display = "none";
        document.querySelector(".register-form").style.display = "none";
        document.querySelector(".login-form").style.display = "none";
        document.querySelector(".modal-friends").style.display = "none";
    }

    return <div className="blur-screen" onClick={handleClick}></div>
}

export default BlurScreen