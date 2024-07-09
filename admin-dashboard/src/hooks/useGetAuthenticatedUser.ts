import {useAsync} from './useFetch';
import {getUser} from '../utils/api';
import {useDispatch} from 'react-redux';
import {setProfileData} from '../redux/features/profile/profileSlice';

export const useGetAuthenticatedUser = () => {
  const dispatch = useDispatch();

  const _async = useAsync();

  const getAuthenticatedUser = async () => {
    const data = await _async.fetchCallBack(async () => {
      const response = await getUser();
      return response;
    });

    let user = null;
    if (data.existingLoggedInUser) {
      user = data.existingLoggedInUser;
    }

    if (data.existingLoggedInManager) {
      user = data.existingLoggedInManager;
    }

    if (user) {
      dispatch(setProfileData(user));
    }

    return user;
  };

  return {
    ..._async,
    getAuthenticatedUser,
  };
};
