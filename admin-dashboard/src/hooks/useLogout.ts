import {useState} from 'react';
// import {logout as logoutApi} from '../utils/api';
import {deleteAuthTokens} from '../utils';
import {clearAllLocalStorage} from '../components/formData';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setIsLoading(true);
    try {
      // await logoutApi();
      await deleteAuthTokens();
      await clearAllLocalStorage();

      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
    error,
  };
};
