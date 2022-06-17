import { useCallback, useState, useRef, useEffect } from 'react';
import { useGetPosts } from '../../api';
import { ButtonIconText } from '../../features';
import Post from './Post';
import styles from '../../assets/css/content.css';
import HOST from '../../api/CONSTANT';
import axios from 'axios';
import { faImages, faFaceKiss } from '@fortawesome/free-regular-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Content = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const { loading, error, posts, hasMore } = useGetPosts(pageNumber);

    //Thay doi pageNumber
    const observer = useRef(); //observer tạo một lần

    const lastPostElementRef = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (hasMore) setPageNumber(prev => prev + 3);
            }
        })
        if (node) observer.current.observe(node);
    }, [loading]);
    //loading thay đổi từ true thành false nghĩa là đã có res => mới có lastpost
    //lúc này useCallback tạo lại hàm, cho observer quan sát node(lastpost)
    //mỗi khi viewport giao node, nếu hasMore = true thì setPageNumber => gọi lại api

    const handlePost = (e) => {
        axios({
            method: "POST",
            url: HOST + "/posts",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'Application/json'
            },
            data: {
                content: document.querySelector(".write__post-input").value
            }
        }).then((res) => {
            window.location.reload();
        });
    }

    return (
        <div className="content">
            <div className="write__post">
                <div className="write__post-wrap">
                    <img src={require("../../assets/images/users/user3.png")} alt="avatar" className="write__post-img" />
                    <input
                        type="text"
                        className="write__post-input"
                        placeholder="Bạn đang nghĩ gì thế?"
                    />
                    <button className="write__post-btn" onClick={handlePost}>Post</button>
                </div>
                <div className="write__post-media">
                    <ButtonIconText icon={ faVideo } text="Live Stream"/>
                    <ButtonIconText icon={ faImages } text="Images"/>
                    <ButtonIconText icon={ faFaceKiss} text="Emotion"/>
                </div>
            </div>
            <div className="posts">
                {posts.map((post, index) => {
                    if (index === posts.length - 1) {
                        return <Post key={index} post={post} ref={lastPostElementRef} />
                        //chỉ những element mới có thể nhận ref và trả về element
                        //Post la 1 function component, no khong the nhan ref, phai dung React.forwardRef
                        //post sẽ chứa tham số ref để truyền vào bên trong một element nào đó
                    } else {
                        return <Post key={index} post={post} />
                    }
                })}
            </div>
        </div>
    )
}

export default Content;