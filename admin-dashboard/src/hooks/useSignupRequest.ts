import { signUp } from './../utils/api';
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

      const {name,email, password, super_admin_key} = formData;

      const responseSignUpUrl: any = await signUp({
        adminName: name,
        email: email,
        password: password,
        adminkey: super_admin_key,
      });

      const jsonData = await responseSignUpUrl.json();
      console.log(jsonData);
      
      if (jsonData.statusCode == 201) {
        setError('');
        navigate('/dashboard');
      } else {
        setError(jsonData.message);
      }

      // setData(jsonData); // Uncomment this line if you want to store the response data for further use.

     

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
