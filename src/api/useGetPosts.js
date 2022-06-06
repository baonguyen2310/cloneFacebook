import { useState, useEffect } from 'react';
import axios from 'axios';

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
            url: "http://localhost:5000/posts",
            params: {
                page: pageNumber
            }
        })
        .then((res) => {
            setPosts(prev => {
                return [...new Set([...prev, ...res.data])]
            });
            setHasMore(res.data.length > 0);
            setLoading(false);
        })
        .catch((err) => {
            setError(true);
        })
    }, [pageNumber]);

    return { loading, error, posts, hasMore }
}

export default useGetPosts;