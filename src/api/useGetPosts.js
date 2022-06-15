import { useState, useEffect } from 'react';
import axios from 'axios';
import HOST from './CONSTANT';

//Dùng hook của React thì chỉ được là react component (bắt đầu in hoa và có return element hoặc component) hoặc react custom hook (bắt đầu bằng use)
//Tạo 1 custom hook nhận vào pageNumber, gọi api khi pageNumber thay đổi, trả về res và trạng thái

const useGetPosts = (pageNumber) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;

        axios({
            method: "GET",
            url: HOST + "/posts",
            params: {
                page: pageNumber
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then((res) => {
            setPosts(prev => {
                return [...new Set([...prev, ...res.data])]
            });
            setHasMore(res.data.length > 0);
            setLoading(false);
        })
        .catch((err) => {
            if (axios.isCancel(err)) return;
            setError(true);
        })
        return (() => {
            cancel();
        })

    }, [pageNumber]);

    return { loading, error, posts, hasMore }
}

export default useGetPosts;