import {
    refreshUrl,
    listingUrl,
    getListingUrl
} from './endpoints';


export const refreshApi = async() => {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await fetch(refreshUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json();
    } catch (err) {
        return err.message
    }
}

export const getListing = async(id) => {
    return await fetch(`${getListingUrl}/${id}`);
}