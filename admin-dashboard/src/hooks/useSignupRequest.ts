import { useState } from 'react';
import { loadFormData } from '../components/formData';
import { saveAuthenticationResponse } from '../utils';
import { createUser, refreshToken, signUp } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const useSignupRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState<any | null>(null);
  const [errror, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const sendSignupRequestUpdated = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const formData = await loadFormData('formData');

      if (!formData) throw new Error('Form data not found');

      const { phoneNumber, password, super_admin_key, role } = formData;

      const responseSignUpUrl: any = await signUp({
        email: phoneNumber,
        password: password,
        role: role,
        superAdminKey: super_admin_key,
      });

      if (!responseSignUpUrl.ok) {
        setError('Signup request failed');
        throw new Error('Signup request failed');
      }

      await saveAuthenticationResponse(responseSignUpUrl);
      await sendRefreshRequestUpdated();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendRefreshRequestUpdated = async (): Promise<void> => {
    const responseRefreshUrl = await refreshToken();
    await saveAuthenticationResponse(responseRefreshUrl);
    await createUserRequestUpdated();
  };

  const createUserRequestUpdated = async (): Promise<void> => {
    const formData: any = await loadFormData('formData');

    const responseCreateUserUrl = await createUser({
      firstname: formData.firstname,
      surname: formData.surname,
    });
    if (responseCreateUserUrl.status === 201) {
      const responseRefreshUrlData = await responseCreateUserUrl.json();

      if (responseRefreshUrlData.statusCode === 400) {
        setError(responseRefreshUrlData.error);
      } 

      navigate('/');
    } else {
      const getData = await responseCreateUserUrl.json();

      throw new Error(`Error Status: ${responseCreateUserUrl.status}, Data: ${getData}`);
    }
  };

  return {
    isLoading,
    errror,
    sendSignupRequestUpdated,
    sendRefreshRequestUpdated,
  };
};
