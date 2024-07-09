import { getAllLoanPayments } from "@/utils/api"; 
import { useState } from "react";

export const useLoanPayments = () => {
    const [data,setData] = useState([]);

    const GetAllLoanPayments = async() => {
        try {
            const response = await getAllLoanPayments();
            const getAllLoanPaymentsResponseData = await response.json();

            if(getAllLoanPaymentsResponseData.statusCode == 200) {
               return setData(getAllLoanPaymentsResponseData.data);
            }
        } catch(error) {
            throw new Error('Faile to fetch loan payments');
        }
    };

    return {
        GetAllLoanPayments,
        data
    };
};
