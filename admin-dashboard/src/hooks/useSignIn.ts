// Import necessary dependencies and AsyncStorage
import { useState } from 'react';
import { signIn} from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const signInUser = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const responseSignIn = await signIn({
        email: email,
        password: password,
      });

      const jsonData = await responseSignIn.json();
      
      if (jsonData.statusCode === 200) {
        setData(jsonData.admin);
        navigate('/dashboard');
        return true;
      }
        


    } catch (e: unknown) {
      setError((e as Error).message);
      setIsLoading(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
    signInUser
  };
};
