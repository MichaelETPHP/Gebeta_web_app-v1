import { useState } from "react";
import { getData, postData, patchData, deleteData } from "./httpMethods";

const UseHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await method(...args);
      return res;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get: (endpoint, headers) => request(getData, endpoint, headers),
    post: (endpoint, payload, headers) => request(postData, endpoint, payload, headers),
    patch: (endpoint, payload, headers) => request(patchData, endpoint, payload, headers),
    del: (endpoint, headers) => request(deleteData, endpoint, headers),
  };
};

export default UseHttp;
