import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignupRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState<any | null>(null);
  const [errror, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const sendSignupRequestUpdated = async (formData:any): Promise<void> => {
    setIsLoading(true);

    try {

      if (!formData) throw new Error('Form data not found');

      const { email, password, super_admin_key} = formData;

      const responseSignUpUrl: any = await signUp({
        email: email,
        password: password,
        superAdminKey: super_admin_key,
      });

      if (!responseSignUpUrl.ok) {
        setError('Signup request failed');
        throw new Error('Signup request failed');
      }

    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errror,
    sendSignupRequestUpdated
  };
};
