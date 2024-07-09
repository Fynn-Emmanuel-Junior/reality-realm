// useAssignRMToLoan
import {assignRmToLoan as assignRmToLoanApi} from '../../../utils/api';
import { useAsync } from '@/hooks/api/useFetch';

export const useAssignRMToLoan = () => {
  const _async = useAsync();

  const assignRmToLoan = async (loanId: string, rmId: string): Promise<any[]> => {
    return await _async.fetchCallBack(async () => {
      const response = await assignRmToLoanApi(loanId, rmId);

      return response;
    });
  };

  return {
    ..._async,
    assignRmToLoan,
  };
  
};
