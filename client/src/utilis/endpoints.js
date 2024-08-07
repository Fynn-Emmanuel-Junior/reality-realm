//public api
//  const apiUrl = ``

//local development api
const developmentApi = 'http://localhost:3500';

//sign in and sign up endpoints
export const signUpUrl = `${developmentApi}/users/register`
export const signInUrl = `${developmentApi}/users/auth`
export const refreshUrl = `${developmentApi}/users/refresh`

//listings endpoints
export const listingUrl = `${developmentApi}/listings`
export const getListingUrl = `${developmentApi}/listings/getlisting`

//Otp endpoint

//payment endpoint

//appointment endpoint
export const bookingUrl = `${developmentApi}/appointment/book`