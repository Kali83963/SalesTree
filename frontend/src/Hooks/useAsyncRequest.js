import { useState } from 'react';

export default function useAsyncRequest() {
  const [result, setResult] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let onRequest = async (callback) => {
    setIsLoading(true);
    const data = await callback;

    setResult(data);
    if (data && data.success === true) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  return { onRequest, result, isSuccess, isLoading };
}