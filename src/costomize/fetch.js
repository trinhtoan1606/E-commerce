import { useEffect, useState } from "react";
import axios from "axios";

// Tạo custom hook get API
const useFetch = (url, isData) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    // Cancel request
    const ourRequest = axios.CancelToken.source();

    async function fetchData() {
      try {
        const res = await axios.get(url, { cancelToken: ourRequest.token });
        let data = res && res.data ? res.data : [];

        setData(data);
        setLoading(false);
        setIsError(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(err.message);
        } else {
          setLoading(false);
          setIsError(true);
        }
      }
    }
    setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      ourRequest.cancel("Canceled!!!");
    };
  }, [url]);
  return { data, loading, isError };
};

export default useFetch;
