import { getCustomers,updateCustomer,getCustomerData} from './../utils/api';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCustomer = () => {
    const dispatch = useDispatch();
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    
    const GetCustomers = async () => {
        try {
            const customersResponse = await getCustomers();
            const customersResponseData: any = await customersResponse?.json();

            return customersResponseData;
        } catch (error) {
            throw new Error('Failed to fetch customers');
        }
    };

    const UpdateCustomer = async (data: any) => {
        try {
            const updateCustomerResponse = await updateCustomer(data);
            const updateCustomerData = await updateCustomerResponse?.json();
            
            return updateCustomerData;
        }catch(error) {
            throw new Error('Failed to update customer'); 
        }
    };

    const GetCustomer = async(id: any) => {
        try {
            const response = await getCustomerData(id);
            const responseData = await response?.json();

            if(responseData.statusCode == 200) {
                return responseData.data.existingUser;
            }
            
        } catch(err) {
            throw new Error('Failed to fecth customer data');
        }
    };

    return {
        GetCustomers,
        UpdateCustomer,
        message,
        GetCustomer
    };
};
