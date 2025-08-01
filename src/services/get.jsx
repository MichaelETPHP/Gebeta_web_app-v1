import { useState, useEffect } from "react";

const UseFetch = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMg, setErrorMg] = useState("");

  async function fetchData() {
      setLoading(true);
    try {
      const res = await fetch(url , {...options});
      if (res.ok) {
        const data =await res.json();
        setData(data);
        setErrorMg("");
      } return;
    } catch (e) {
      console.log(e);
      setErrorMg("something went wrong!!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, errorMg };
};

export default UseFetch;
