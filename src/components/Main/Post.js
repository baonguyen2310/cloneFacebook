import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarth,
    faEllipsis,
    faThumbsUp,
    faMessage,
    faShare
} from '@fortawesome/free-solid-svg-icons';

import Comment from './Comment';

const Post = (props, ref) => {
    const post = props.post;

    const handleEnter = () => {

    };

    return (
        <div className="post" ref={ref}>
            <div className="post__header">
                <div className="post__header-info">
                    <div className="post__header-user-img">
                        <img
                            src=""
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
                    <iframe width="680" height="400" src={post.media}></iframe>
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
                                src=""
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
                                src=""
                                alt="user image"
                                className="post__comment-user-img" />
                        </div>
                        <div className="post__comment-content">
                            <div className="post__comment-user-name">
                                Cận Khá Nặng
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