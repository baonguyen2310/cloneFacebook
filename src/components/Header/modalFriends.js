import { useEffect, useState } from "react";
import axios from "axios";

const ModalFriends = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: "https://18.142.227.93/friends",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {
            console.log(res.data);
            setUsers(res.data);
        }).catch((err) => {
            return err;
        })
    }, [])
    return (
        <ul className="modal-friends">
            {users.map((user, index) => {
                return (
                    <li className="modal-friends__item" key={index}>
                        <div className="modal-friends__name">{user}</div>
                        <button className="modal-friends__btn">Follow</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default ModalFriends;