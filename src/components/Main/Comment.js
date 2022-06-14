const Comment = ({ comment }) => {
    return (
        <div className="post__comment-read">
            <div className="post__comment-user-img">
                <img
                    src={require("../../assets/images/users/user1.jpg")}
                    alt="user image"
                    className="post__comment-user-img" />
            </div>
            <div className="post__comment-content">
                <div className="post__comment-user-name">
                    {comment.userName}
                </div>
                <div className="post__comment-text">
                    {comment.content}
                </div>
            </div>
        </div>
    );
};

export default Comment;