import { useEffect, useState } from "react";

const useApi = (url, flag) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);
    try {
      setIsLoading(false);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [flag]);

  return { data, isLoading, error };
};

export default useApi;
