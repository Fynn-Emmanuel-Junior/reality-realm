import { getGuarantors,getGuarantorById } from "@/utils/api";
import { useState } from "react";

export const useGuarantors = () => {
    const [data,setData] = useState([]);

    const GetAllGuarantors = async() => {
        try {
            const response = await getGuarantors();
            const responseData = await response.json();

            if(responseData.statusCode == 200) {
                setData(responseData.data);
            }

        } catch(err) {
            throw new Error('Failed to fetch Guarantors');
        }
    };

    const GetGuarantor = async(id: any) => {
        try {
            const response = await getGuarantorById(id);
            const responseData: any = await response.json();
            return responseData.data;

        } catch(err) {
            throw new Error('Failed to fetch Guarantor');
        }
    };

    return {
        GetAllGuarantors,
        GetGuarantor,
        data
    };
};