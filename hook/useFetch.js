import axios from "axios";
import { useState, useEffect } from "react";

export default useFetch = (endpoint, query) => {
    const [ data, setData ] = useState([]) ;
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${ endpoint }`,
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const resp = await axios.request(options)
            setData(resp.data.data);
        } catch(error) {
            setError(error);
            alert('Error during data fetch')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, reFetch };
}