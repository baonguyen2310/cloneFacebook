import React from 'react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarth,
    faEllipsis,
    faThumbsUp,
    faMessage,
    faShare
} from '@fortawesome/free-solid-svg-icons';
import HOST from '../../api/CONSTANT';
import axios from 'axios';

import Comment from './Comment';

const getParentElement = (childElement, classNameParent) => {
    while (childElement.parentElement.className !== classNameParent) {
        childElement = childElement.parentElement;
    }

    return childElement.parentElement;
}


const Post = (props, ref) => {
    const [userName, setUserName] = useState("Cận khá nặng");
    const post = props.post;

    const handleEnter = (event) => {
        if (event.key === "Enter") {

            //Interupt
            console.log(event.target);
            const parentInterupt = getParentElement(event.target, "post__comment"); //chú ý truyền className để so sánh không có dấu chấm
            const interuptElement = parentInterupt.querySelector(".post__comment-interupt")
            interuptElement.style.display = "flex";
            interuptElement.querySelector(".post__comment-text").innerHTML = event.target.value;

            axios({
                method: "POST",
                url: HOST + "/comment",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'Application/json'
                },
                data: {
                    id: post._id,
                    comment: event.target.value
                }
            }).then((res) => {
                event.target.value = "";
                setUserName(res.data);
            });

        }
    }

    return (
        <div className="post" ref={ref}>
            <div className="post__header">
                <div className="post__header-info">
                    <div className="post__header-user-img">
                        <img
                            src={require("../../assets/images/users/user1.jpg")}
                            alt="user image"
                            className="post__header-user-img" />
                    </div>
                    <div>
                        <div className="post__header-user-name">
                            {post.userName}
                        </div>
                        <div className="post__header-subinfo">
                            <div className="post__header-time">
                                {post.time}
                            </div>
                            <div className="post__header-privacy">
                                <FontAwesomeIcon icon={faEarth} className="post__header-privacy-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post__header-modify">
                    <FontAwesomeIcon icon={faEllipsis} className="post__header-modify-icon" />
                </div>
            </div>
            <div className="post__content">
                <div className="post__content-text">
                    {post.content}
                </div>
                <div className="post__content-media">
                    <iframe className="post__content-media-iframe" src={post.media}></iframe>
                </div>
            </div>
            <div className="post__action">
                <div className="post__action-info">
                    <div className="post__action-info-like">
                        <FontAwesomeIcon icon={faThumbsUp} className="post__action-info-like-icon" />
                        {post.infoAction.infoLike}
                    </div>
                    <div className="post__action-info-comment">
                        {post.infoAction.infoComment} bình luận
                    </div>
                    <div className="post__action-info-share">
                        {post.infoAction.infoShare} lượt chia sẻ
                    </div>
                </div>
                <div className="post__action-list">
                    <div className="post__action-like">
                        <FontAwesomeIcon icon={faThumbsUp} className="post__action-like-icon" />
                        Thích
                    </div>
                    <div className="post__action-comment">
                        <FontAwesomeIcon icon={faMessage} className="post__action-comment-icon" />
                        Bình luận
                    </div>
                    <div className="post__action-share">
                        <FontAwesomeIcon icon={faShare} className="post__action-share-icon" />
                        Chia sẻ
                    </div>
                </div>
                <div className="post__comment">
                    <div className="post__comment-write">
                        <div className="post__comment-user-img">
                            <img
                                src={require("../../assets/images/users/user1.jpg")}
                                alt="user image"
                                className="post__comment-user-img" />
                        </div>
                        <div className="post__comment-input">
                            <input
                                type="text"
                                onKeyPress={handleEnter}
                                className="post__comment-input-form"
                                placeholder="Viết bình luận..." />
                        </div>
                    </div>
                    <div className="post__comment-read post__comment-interupt">
                        <div className="post__comment-user-img">
                            <img
                                src={require("../../assets/images/users/user1.jpg")}
                                alt="user image"
                                className="post__comment-user-img" />
                        </div>
                        <div className="post__comment-content">
                            <div className="post__comment-user-name">
                                {userName}
                            </div>
                            <div className="post__comment-text">
                            </div>
                        </div>
                    </div>
                    <div className="post__comments-read">
                        {post.comments.map((comment, index) => {
                            return (
                                <Comment comment={comment} key={index} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.forwardRef(Post);