import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleIsLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  return { isLoading, handleIsLoading };
};
