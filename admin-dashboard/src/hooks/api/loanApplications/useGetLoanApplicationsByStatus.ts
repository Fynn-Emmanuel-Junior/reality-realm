import { useState } from 'react';
import {getLoanApplicationByStatus as getLoanApplicationsApi} from '../../../utils/api';

import { useAsync } from '@/hooks/api/useFetch';
import { LoanApplicationModel } from './IApplication';
export const useGetLoanApplicationsByStatus = () => {
  const [data, setData] = useState<any>([]);
  const _async = useAsync();

  const getLoanApplications = async (status: string): Promise<LoanApplicationModel[]> => {
    const data = await _async.fetchCallBack(async () => {
      const response = await getLoanApplicationsApi(status);
      return response;
    });

    const applications = data.loanApplicationsData as LoanApplicationModel[];
    setData(applications);

    return applications;
  };

  return {
    ..._async,
    getLoanApplications,
    data:data,
  };
  
};
