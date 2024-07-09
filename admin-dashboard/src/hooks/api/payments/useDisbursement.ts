import {disbursePayment as disburseLoanApi} from '../../../utils/api';
import {useAsync} from '../../useFetch';
export const useDisbursement = () => {
  const _async = useAsync();

  const disburseLoan = async (loanId : string, amount : number,phoneNumber : string, name : string): Promise<any[]> => {
    return await _async.fetchCallBack(async () => {

      const data = {
        account_bank: "MPS",
        account_number: "256702835028", // static
        amount: amount,   
        loan_id: loanId,
        beneficiary_name:name,
        "currency": "UGX",  //static
        meta:{
            sender: "CCF App", //static
            sender_country: "UG", // static
            mobile_number: phoneNumber
        }
      };
      const response = await disburseLoanApi(data);

      return response;
    });
  };

  return {
    ..._async,
    disburseLoan,
  };
};
