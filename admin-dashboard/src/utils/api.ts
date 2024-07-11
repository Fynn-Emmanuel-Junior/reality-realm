import {
  getUserUrl,
  updateUserProfileUrl,
  updateCustomerUrl,
  getCustomersUrl,
  getCustomerDataUrl,
  signUpUrl,
  signInUrl
} from './endpoints';

export const signUp = async(data: any) => {
  try {
    const response = await fetch(signUpUrl, {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response;
  }catch(err) {
  throw new Error('Failed to create admin');
  }
}

export const signIn = async(data: any) => {
  try {
    const response = await fetch(signInUrl, {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response;
  }catch(err) {
  throw new Error('Failed to create admin');
  }
}


export const getUser = async () => {
  return await fetch(getUserUrl);
};

export const updateUser = async (data: object) => {
  return await fetch(updateUserProfileUrl, {
    method: 'put',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
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
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

