import {
    getListing,
    getBooking
} from '../../utilis/api';

export const useListing = () => {
    const GetListing = async(id) => {
        const response = await getListing(id);
        const responseData = await response.json();
        return responseData;
    }

    const Booking = async() => {

    }

    return {
        GetListing,
        Booking
    }
}