import {deleteFormData, saveFormData} from '../components/formData';

// import {LoanPayment} from './interfaces';

export async function saveAuthenticationResponse(response: Response) {
  // TODO: to include a front-end token if necessary
  if (response.status === 200) {
    // lets get our access/refresh tokens
    let accessToken = '';
    let refreshToken = '';

    response.headers.forEach((value: string, name: string) => {
      if (name === 'st-access-token') accessToken = value;
      if (name === 'st-refresh-token') refreshToken = value;
    });

    if (accessToken != null) {
      await saveFormData('accessToken', accessToken);
    }
    if (refreshToken != null) {
      await saveFormData('refreshToken', refreshToken);
    }
  } else {
    const getData = await response.json();
    throw new Error(`Error Status: ${response.status}, Data: ${getData}`);
  }
}

export async function deleteAuthTokens() {
  try {
    //remove tokens to avoid using old ones0
    await deleteFormData('accessToken');
    await deleteFormData('refreshToken');
    return true;
  } catch (error) {
    return false;
  }
}

