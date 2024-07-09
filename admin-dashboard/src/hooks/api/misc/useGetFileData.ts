import { useState } from 'react';
import {getFileData as getFileDataApi} from '../../../utils/api';
import { useAsync } from '@/hooks/api/useFetch';

export const useGetFileData = () => {
    const [data, setData] = useState(null);
  const _async = useAsync();

  const getFileData = async (fileId): Promise<any[]> => {
    const data = await _async.fetchCallBack(async () => {
      const response = await getFileDataApi(fileId);
      return response;
    });
    setData(data.data);
    return data.data;
  };

  return {
    ..._async,
    data:data,
    getFileData,
  };
  
};
