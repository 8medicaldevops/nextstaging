import { useState } from 'react';
import axios from 'axios';

const usePatchData = (url, accessToken) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const patchData = async (id, patchObject) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`${url}${id}`, patchObject, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setResponse(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { response, setResponse, error, loading, patchData };
};

export default usePatchData;
