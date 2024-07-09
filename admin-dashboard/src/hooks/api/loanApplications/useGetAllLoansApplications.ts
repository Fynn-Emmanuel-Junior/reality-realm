import { useState } from 'react';
import {getLoanApplications as getLoanApplicationsApi} from '../../../utils/api';

import { useAsync } from '@/hooks/api/useFetch';
import { LoanApplicationModel } from './IApplication';
export const useGetAllLoanApplications = () => {
  const _async = useAsync();

  const [data, setData] = useState<any>([]);

  const getAllLoanApplications = async (): Promise<LoanApplicationModel[]> => {
    const data = await _async.fetchCallBack(async () => {
      const response = await getLoanApplicationsApi();
      return response;
    });

    const applications = data.loanApplicationsData as LoanApplicationModel[];
    setData(applications);
    
    return applications;
  };

  return {
    ..._async,
    getAllLoanApplications,
    data:data,
  };
  
};
