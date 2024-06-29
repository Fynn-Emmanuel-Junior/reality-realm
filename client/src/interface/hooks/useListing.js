import {
    getListing
} from '../../utilis/api';

export const useListing = () => {
    const GetListing = async(id) => {
        const respone = await getListing(id)
    }
    return {
        GetListing
    }
}