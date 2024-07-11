import {
  getUserUrl,
  updateUserProfileUrl,
  updateCustomerUrl,
  getCustomersUrl,
  getCustomerDataUrl
} from './endpoints';

export const getUser = async () => {
  return await fetch(getUserUrl);
};

export const updateUser = async (data: object) => {
  return await fetch(updateUserProfileUrl, {
    method: 'put',
    body: JSON.stringify(data),
  });
};

export const getCustomers = async () => {
  try {
   const response = await fetch(`${getCustomersUrl}/get-users`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerData = async(id: any) => {
  return await fetch(`${getCustomerDataUrl}/${id}`);
};

export const updateCustomer = async (data: any) => {
  try {
    const response = await fetch(updateCustomerUrl, {
      method: 'put',
      body: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

