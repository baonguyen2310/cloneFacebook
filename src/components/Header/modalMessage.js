import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import HOST from "../../api/CONSTANT";
import styles from "./modalMessage.css";

const getParentElement = (childElement, classNameParent) => {
    while (childElement.parentElement.className !== classNameParent) {
        childElement = childElement.parentElement;
    }

    return childElement.parentElement;
}

const ModalNetMessage = (props, ref) => {

    const handleRefresh = () => {
        axios({
            method: "GET",
            url: HOST + "/message/getnetmessage",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {
            console.log(res.data);
            setNets(res.data);
        }).catch((err) => {
            return err;
        });
    }

    const ModalMessage = ({ targetId, messages }) => {
        console.log("messages", messages);
        return (
            <div className="modal-message">
                <button className="modal-message__text" onClick={handleRefresh}>
                    Tính năng đăng phát triển: Hiện bạn phải nhấn vào đây để cập nhật tin nhắn mới
                </button>
                <ul className="modal-message__list">
                    {messages.map((message, index) => {
                        if (message.sourceId === targetId){ //nếu tin nhắn này là của người targetId nhắn
                            return (
                                <li key={index} className="modal-message__item-target">
                                    <div className="modal-message__message">{message.content}</div>
                                </li>
                            )
                        }
                        //nếu tin nhắn này là của mình nhắn
                        return (
                            <li key={index} className="modal-message__item-source">
                                <div className="modal-message__message">{message.content}</div>
                            </li>
                        )
                    })}
                </ul>
                <div className="modal-message__write">
                    <input type="text" className="modal-message__input" placeholder="Aa" />
                    <button className="modal-message__btn" onClick={(e) => sendMessage(e, targetId)}>Send</button>
                </div>
            </div>
        );
    }

    const [nets, setNets] = useState([]);
    const [choiceTarget, setChoiceTarget] = useState("");
    const [messages, setMessages] = useState("");
    const [loading, setLoading] = useState(true);

    const sendMessage = (e, targetId) => {
        setLoading(true);
        console.log(e.target.parentElement);
        axios({
            method: "POST",
            url: HOST + "/message/sendmessage",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'Application/json'
            },
            data: {
                targetId: targetId,
                message: e.target.parentElement.querySelector(".modal-message__input").value
            }
        }).then((res) => {
            ref.current.emit('send', targetId);
            setLoading(false);
        });
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: HOST + "/message/getnetmessage",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {
            console.log(res.data);
            //ké setUserName cho server biết tương ứng với socketId nào
            console.log("ref", ref.current);
            ref.current.emit("setUserName", res.data[0].sourceId);

            setNets(res.data);
        }).catch((err) => {
            return err;
        });

    }, [loading, props.newMessage])

    //mỗi lần gọi lại axios -> setNets làm cho trang văng về vị trí đầu, chạy lại css
    //mỗi lần setNets -> mở lại trang đang nhắn tin và focus vào phần input 
    useEffect(() => {
        document.querySelectorAll(".modal-net-message__name").forEach((element, index) => {
            if (element.innerText === choiceTarget) {
                element.parentElement.parentElement.querySelector(".modal-message").style.display = "block";
                element.parentElement.parentElement.querySelector(".modal-message__input").focus();
            } 
        })
    }, [nets]);

    const handleTarget = (e, targetId) => {
        document.querySelectorAll(".modal-message").forEach((element, index) => {
            element.style.display = "none";
        })
        console.log(e.target);
        const parent = getParentElement(e.target, "modal-net-message__item");
        parent.querySelector(".modal-message").style.display = "block";
        setChoiceTarget(targetId);
    }

    return (
        <ul className="modal-net-message">
            {nets.map((net, index) => {
                return (
                    <li className="modal-net-message__item" key={index}>
                        <div className="modal-net-message__item-wrap" onClick={(e) => handleTarget(e, net.targetId)}>
                            <img src={require("../../assets/images/users/user3.png")} alt="user avatar" className="user-avatar-medium" />
                            <div className="modal-net-message__name">{net.targetId}</div>
                        </div>
                        <ModalMessage targetId={net.targetId} messages={net.messages}/>
                    </li>
                )})
            }
        </ul>
    )
}

export default React.forwardRef(ModalNetMessage);