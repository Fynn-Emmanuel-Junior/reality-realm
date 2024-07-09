import { 
    getLoanProduct,
    createLoanProduct,
    getLoanProductById,
    updateLoanProduct,
    deleteLoanProduct
} from "../utils/api";
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {getloanProduct} from '../redux/features/loanProducts/loanProductSlice';
import { useNavigate } from "react-router-dom";

export const useLoanProduct = () => {
    const dispatch = useDispatch();
    const [deleted,setDeleted] = useState(false);
    const navigate = useNavigate();

    const GetLoanProducts = async() => {
        try {
            const getLoanProductResponse: any = await getLoanProduct();
            const getLoanproductsdata: any = await getLoanProductResponse.json();

            return getLoanproductsdata.data;

        } catch(err) {
            throw new Error('Failed to fetch loan products');
        }
    };

    const CreateLoanProduct = async(data: any) => {
        const {interest_rate,payment_period,payment_frequency,amount} = data;
        const rate = [interest_rate];
        const period = [payment_period];
        const frequency = [payment_frequency];
        const Amount = Array.isArray(amount) ? amount : [amount];

        try {
            const createLoanproductResponse = await createLoanProduct({
                name: data.name,
                type: data.type_of_loan,
                terms_and_conditions: data.terms_and_conditions,
                interest_rate: rate,
                payment_period: period,
                payment_frequency: frequency,
                amount: Amount
            });

            const createLoanproductData: any = await createLoanproductResponse?.json();

            if(createLoanproductData.statusCode == 201) {
                navigate('/view-loan-products');
            }
            if(createLoanproductData.statusCode == 400) {
                throw new Error('Invalid Credentials');
            }
        } catch(err) {
            throw new Error('Failed to create loan product');
        }
    };

    const GetLoanProductById = async(id: any) => {
        try {
            const response = await getLoanProductById(id);
            const responseData = await response?.json();
            
            dispatch(getloanProduct(responseData.data));

        } catch(err) {
            throw new Error('failed to retrieve loan product');
        }
    };

    const UpdateLoanProduct = async(data: any,Id: any) => {
        const {interest_rate,amount,payment_frequency,payment_period} = data;
        const rate = [interest_rate];
        const Amount = amount;
        const frequency = [payment_frequency];
        const period = [payment_period];

        try {
            const updateLoanproductResponse: any = await updateLoanProduct({
                id: Id,
                interest_rate: rate,
                amount: Amount,
                payment_frequency: frequency,
                payment_period: period,
                terms_and_conditions: data.terms_and_conditions,
                type: data.type_of_loan,
                name: data.name,
            });
            const updateLoanproductResponseData = await updateLoanproductResponse.json(); 
            
            if(updateLoanproductResponseData.statusCode == 201) {
                navigate('/view-loan-products');
            }
            if(updateLoanproductResponseData.statusCode == 400) {
                throw new Error('Invalid Credentials');
            }

        } catch(err) {
            throw new Error('Failed to update laon product');
        }
    };

    const DeleteLoanProduct = async(id: any) => {
        try {
            await deleteLoanProduct(id);
            await GetLoanProducts();
            setDeleted(true);
        } catch(err:unknown) {
            throw new Error('Failed to delete loan product');
        }
    };

    return {
        GetLoanProducts,
        CreateLoanProduct,
        GetLoanProductById,
        UpdateLoanProduct,
        DeleteLoanProduct,
        deleted
    };
};
