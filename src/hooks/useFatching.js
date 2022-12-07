import { useState } from "react";

export const useFatching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fatching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fatching, isLoading, error];
};
