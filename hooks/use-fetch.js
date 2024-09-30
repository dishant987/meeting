import { useState } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(...args);
      setData(res);

      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fn };
};

export default useFetch;
