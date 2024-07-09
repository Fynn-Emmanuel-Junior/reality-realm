// useAssignRMToLoan
import {managerApproveLoan as managerApproveLoan} from '../../../utils/api';
import { useAsync } from '@/hooks/api/useFetch';

export const useAproveLoan = () => {
  const _async = useAsync();

  const aproveLoan = async (loanId: string, approve : boolean  , message = ""): Promise<any[]> => {
    return await _async.fetchCallBack(async () => {
      const response = await managerApproveLoan(loanId, approve, message);
      return response;
    });
  };

  return {
    ..._async,
    aproveLoan,
  };
  
};
