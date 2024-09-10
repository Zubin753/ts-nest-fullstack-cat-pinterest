import { useState } from "react";

export const useFetching = <T>(
  callback: () => Promise<T>,
): [() => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        throw new Error("Ошибка в подгрузке");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
