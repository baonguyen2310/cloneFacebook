import { useCallback, useState, useRef, useEffect } from 'react';
import { useGetPosts } from '../../api';
import { AvatarInput, ButtonIconText } from '../../features';
import Post from './Post';

const Content = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const { loading, error, posts, hasMore } = useGetPosts(pageNumber);

    //Thay doi pageNumber
    const observer = useRef();
    
    const lastPostElementRef = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                if(hasMore) setPageNumber(prev => prev + 1);
            }
        })
        if(node) observer.current.observe(node);
    }, [loading]);



    return (
        <div className="content">
            <div className="write__post">
                <AvatarInput />
                <div className="write__post-media">
                    <div className="write__post-livestream">
                        <ButtonIconText />
                    </div>
                </div>
            </div>
            <div className="posts">
                {posts.map((post, index) => {
                    if (index === posts.length-1){
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