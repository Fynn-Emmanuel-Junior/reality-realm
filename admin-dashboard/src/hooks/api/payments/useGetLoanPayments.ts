import { getLoanPayments as getLoanPaymentsApi} from '../../../utils/api';

import { useAsync } from '@/hooks/api/useFetch';
export const useGetLoanPayments = () => {
  const _async = useAsync();

  const getLoanPayments = async (loanId : string, limit = 3): Promise<any[]> => {
    return await _async.fetchCallBack(async () => {
      const response = await getLoanPaymentsApi(loanId, limit);


      return response; 
    });
  };

  return {
    ..._async,
    getLoanPayments,
  };
};
