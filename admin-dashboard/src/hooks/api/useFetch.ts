import { useState } from 'react';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

interface AsyncState<T> {
  finished: boolean;
  isLoading: boolean;
  data: T | null;
  statusCode: any | null;
  error: string | null;
}

export const useAsync = <T>(): AsyncState<T> & {
  fetchCallBack: (
    callback: AsyncFunction<Response>,
    ...args: any[]
  ) => Promise<T | any>;
} => {
  const [finished, setFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<any | null>(null);

  const fetchCallBack = async (
    callback: AsyncFunction<Response>,
    ...args: any[]
  ): Promise<any> => {
    setError(null);
    setIsLoading(true);
    setFinished(false);
    setStatusCode(null);
    try {
      const response = await callback(...args);
      const result = await response.json();
      setStatusCode(result?.statusCode || response.status);

      if (!(result.statusCode >= 200 && result.statusCode < 400)) {
        throw new Error(
          result.message ||
            result.error.message ||
            result.error ||
            'Something went wrong',
        );
      }

      setData(result.data);
      setFinished(true);
      return result.data;
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    finished,
    isLoading,
    data,
    error,
    statusCode,
    fetchCallBack,
  };
};
