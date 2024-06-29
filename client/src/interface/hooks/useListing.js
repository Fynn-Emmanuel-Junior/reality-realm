import {
    getListing
} from '../../utilis/api';

export const useListing = () => {
    const GetListing = async(id) => {
        const response = await getListing(id);
        const responseData = await response.json();
        return responseData;
    }
    return {
        GetListing
    }
}