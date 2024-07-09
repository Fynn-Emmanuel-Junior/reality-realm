// Import necessary dependencies and AsyncStorage
import { useState } from 'react';
import { saveAuthenticationResponse } from '../utils';
import { signIn,UpdateManager} from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/auth/superAdminSlice';
import { setRole } from '../redux/features/role/roleSlice';
import {removeProfileData} from '../redux/features/profile/profileSlice';
import { jwtDecode } from 'jwt-decode';
import { loadFormData } from '../components/formData';
import {useGetAuthenticatedUser} from './useGetAuthenticatedUser';
import { useGetLoanApplicationsByStatus } from './api/loanApplications/useGetLoanApplicationsByStatus';
import { setApprovals } from '@/redux/features/approvals/approvalsSlice';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {getAuthenticatedUser} = useGetAuthenticatedUser();
  const { getLoanApplications} = useGetLoanApplicationsByStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInUser = async (phonenumber: String, password: String): Promise<boolean | null> => {
    setError(null);
    setIsLoading(true);

    try {
      const responseSignIn = await signIn({
        email: phonenumber,
        password: password,
      });

      const jsonData = await responseSignIn.json();

      if(jsonData.status == 'WRONG_CREDENTIALS_ERROR') {
        setError('Wrong Credentials');
        setIsLoading(false);
        return false;
      }
      
      if (responseSignIn.status == 201 || responseSignIn.status == 200) {
        setIsLoading(false);
        await saveAuthenticationResponse(responseSignIn);

        const loans = await  getLoanApplications('Pending');
        dispatch(setApprovals(loans.length));
        console.log(loans);

        const token = await loadFormData('accessToken');
        const decodedToken: any = jwtDecode(token);

        if (decodedToken.role === 'RelationshipManager') {
          setError('Relationship Manaager cannot sign in');
          navigate('/');
        } else {
          const data = await getAuthenticatedUser();

          dispatch(login(true));
          dispatch(setRole(decodedToken.role));
          navigate('/loans-list');
          setData(jsonData.data);

          return data;
        }

        return data;
      } else {
        throw new Error('Wrong Credentials');
      }
    } catch (e: unknown) {
      setError((e as Error).message);
      setIsLoading(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const EditProfile = async(data: any) => {
    dispatch(removeProfileData());
    try {
      const response: any = await UpdateManager(data);
      const editAdminProfileResponse = await response.json();

      if(editAdminProfileResponse.statusCode == 201) {
        const data = await getAuthenticatedUser();
        return data;
      }

    } catch(error: unknown) {
      throw new Error('Failed to update Admin profile');
    }
  };

  return {
    isLoading,
    error,
    data,
    signInUser,
    EditProfile
  };
};
