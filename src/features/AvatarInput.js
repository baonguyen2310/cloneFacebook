const AvatarInput = () => {
    return (
        <div className="avatar-input">
            <img src={require("../assets/images/users/user1.jpg")} alt="avatar" className="avatar-input__img" />
            <input 
                type="text" 
                className="avatar-input__input"
                placeholder="Bảo ơi, bạn đang nghĩ gì thế?"
            />
        </div>
    )
}

export default AvatarInput;