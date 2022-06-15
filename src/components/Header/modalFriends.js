import { useEffect, useState } from "react";
import axios from "axios";
import HOST from "../../api/CONSTANT";

const ModalFriends = () => {
    const [users, setUsers] = useState([]);
    const [requiringFriends, setRequiringFriends] = useState([]);
    const [yourFriends, setYourFriends] = useState([]);
    const [optionFriend, setOptionFriend] = useState("People You May Know");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: "GET",
            url: HOST + "/friends/suggestfriends",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {
            console.log(res.data);
            setUsers(res.data);
        }).catch((err) => {
            return err;
        });

        axios({
            method: "GET",
            url: HOST + "/friends/getyourfriends",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {
            setYourFriends(res.data);

        }).catch((err) => {
            return err;
        });

        axios({
            method: "GET",
            url: HOST + "/friends/getrequiringfriends",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {
            setRequiringFriends(res.data)

        }).catch((err) => {
            return err;
        });

    }, [loading])

    const requireFriend = (e) => {
        console.log(e.target.parentElement.querySelector(".modal-friends__name").innerText);
        setLoading(true);
        axios({
            method: "POST",
            url: HOST + "/friends/requirefriend",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'Application/json'
            },
            data: {
                targetId: e.target.parentElement.querySelector(".modal-friends__name").innerText
            }
        }).then((res) => {
            setLoading(false);
        });
    }

    const acceptFriend = (e) => {
        setLoading(true);
        axios({
            method: "POST",
            url: HOST + "/friends/acceptfriend",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'Application/json'
            },
            data: {
                sourceId: e.target.parentElement.querySelector(".modal-friends__name").innerText
            }
        }).then((res) => {
            setLoading(false);
        });
    }

    const handleSuggestions = (e) => {
        setOptionFriend("People You May Know");
        document.querySelector(".suggestions").style.display = "block";
        document.querySelector(".friend-requests").style.display = "none";
        document.querySelector(".your-friends").style.display = "none";
    }

    const handleFriendRequests = (e) => {
        setOptionFriend("Friend Requests");
        document.querySelector(".suggestions").style.display = "none";
        document.querySelector(".friend-requests").style.display = "block";
        document.querySelector(".your-friends").style.display = "none";
    }

    const handleYourFriends = (e) => {
        setOptionFriend("Your Friends");
        document.querySelector(".suggestions").style.display = "none";
        document.querySelector(".friend-requests").style.display = "none";
        document.querySelector(".your-friends").style.display = "block";
    }

    return (
        <div className="modal-friends">
            <div className="friend-option__list">
                <button className="friend-option__btn" onClick={handleSuggestions}>Suggestions</button>
                <button className="friend-option__btn" onClick={handleFriendRequests}>Friend Requests</button>
                <button className="friend-option__btn" onClick={handleYourFriends}>Your Friends</button>
            </div>
            <div className="friend-option__label">{optionFriend}</div>
            <ul className="modal-friends__list suggestions">
                {users.map((user, index) => {
                    return (
                        <li className="modal-friends__item" key={index}>
                            <img src={require("../../assets/images/users/user3.png")} alt="user avatar" className="user-avatar"/>
                            <div className="modal-friends__wrap">
                                <div className="modal-friends__name">{user.userName}</div>
                                <button className="modal-friends__btn-add" onClick={requireFriend}>Add Friend</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <ul className="modal-friends__list friend-requests">
                {requiringFriends.map((user, index) => {
                    return (
                        <li className="modal-friends__item" key={index}>
                            <img src={require("../../assets/images/users/user3.png")} alt="user avatar" className="user-avatar"/>
                            <div className="modal-friends__wrap">
                                <div className="modal-friends__name">{user}</div>
                                <button className="modal-friends__btn-confirm" onClick={acceptFriend}>Confirm</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <ul className="modal-friends__list your-friends">
                {yourFriends.map((user, index) => {
                    return (
                        <li className="modal-friends__item" key={index}>
                            <img src={require("../../assets/images/users/user3.png")} alt="user avatar" className="user-avatar"/>
                            <div className="modal-friends__wrap">
                                <div className="modal-friends__name">{user}</div>
                                <button className="modal-friends__btn-delete">Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ModalFriends;