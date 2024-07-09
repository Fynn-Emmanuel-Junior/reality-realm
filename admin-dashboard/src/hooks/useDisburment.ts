import { useDispatch } from 'react-redux';
import { getAllDisbursements } from "@/utils/api";
import { getDisbursements } from '@/redux/features/disbursements/disbursementSlice';
import { useState } from 'react';

export const  useDisbursement = () => {
    const dispatch = useDispatch();
    const [data,setData] = useState([]);

    const GetAllDisbursements = async() => {
        try {
            const disbursementsResponse = await getAllDisbursements();
            const disbursementsResponseData: any = await disbursementsResponse?.json();
            
            if(disbursementsResponseData.statusCode == 200) {
                dispatch(getDisbursements(disbursementsResponseData.data));
                setData(disbursementsResponseData.data);
            } 
            
        }catch(error) {
            throw new Error('Failed to fetch disbursements');
        }
    };
    return {
        GetAllDisbursements,
        data
    };
};
