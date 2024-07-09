import { useState } from 'react';
import { getFileLink, getUserById as getUserByIdApi} from '../../../utils/api';

import { useAsync } from '@/hooks/api/useFetch';
import { ExistingUser } from './IUser';
export const useGetUserDetails = () => {
  const _async = useAsync();

  const [data, setData] = useState<any>({});

  const getUserDetails = async (id : string): Promise<ExistingUser> => {
    const data =  await _async.fetchCallBack(async () => {
      const response = await getUserByIdApi(id);
      return response;
    });

    let user = data.existingUser as ExistingUser;

    user = {
      ...user,
      profileImageUrl: user?.profileImage ? getFileLink(user.profileImage) : '',
      idImageFrontUrl: user?.idImageFront ? getFileLink(user.idImageFront) : '',
      idImageBackUrl: user?.idImageBack ? getFileLink(user.idImageBack) : '',
    };

    setData(user);
    return user;
  };

  return {
    ..._async,
    data: data,
    getUserDetails,
  };
};
