import { useState, useEffect } from "react";
import hstkFetch from "../hstkFetch";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await hstkFetch(url);
                if (!response.ok) {
                    throw new Error(`Gretchen, stop trying to make hstkFetch happen. It's not going to happen: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [url])

    return { data, loading, error };
}

export default useFetch;