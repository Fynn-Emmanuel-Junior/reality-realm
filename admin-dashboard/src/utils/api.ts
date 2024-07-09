import { deleteAuthTokens, saveAuthenticationResponse } from './index';
import { loadFormData } from '../components/formData';
import {
  logoutUrl,
  refreshUrl,
  signInUrl,
  signUpUrl,
  verifyDetailsUrl,
  managerUrl,
  createUserUrl,
  getManagersUrl,
  updateManagerUrl,
  LoanProductUrl,
  getLoanApplicationsUrl,
  getCustomersUrl,
  getUserByIdUrl,
  getUserLoanPaymentsUrl,
  getFileUrl,
  assignRmToLoanUrl,
  managerApprovesLoanUrl,
  getUserUrl,
  updateUserProfileUrl,
  updateCustomerUrl,
  getLoanApplicationsByStatusUrl,
  disbursementUrl,
  disbursepaymentUrl,
  getAllLoanPaymentsUrl,
  verifyuserDetailsUrl,
  guarantorUrl,
  getFileDataUrl,
  getCustomerDataUrl
} from './endpoints';

interface FormField {
  id: string;
  value: any;
}

interface AuthServerBody {
  formFields: FormField[];
}

const buildAuthServerBody = (data: Record<string, any>): AuthServerBody => {
  const formFields: FormField[] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const field = { id: key, value: data[key] };
      formFields.push(field);
    }
  }

  return { formFields };
};

const buildHeaders = async () => {
  const token = await loadFormData('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && {
      Authorization: `Bearer ${token}`,
      'st-auth-mode': 'header',
    }),
    rid: 'emailpassword',
  };
  return headers;
};

const fetchWhenAuth = async (input: RequestInfo, init?: RequestInit) => {
  let response = await fetch(input, {
    headers: await buildHeaders(),
    ...init,
  });

  if (response.status === 401) {
    const error = await response.json();
    if (error.message == 'try refresh token') {
      const refreshResponse = await refreshToken();
      if (refreshResponse.status == 401) {
        await deleteAuthTokens();
        return response;
      }
      await saveAuthenticationResponse(refreshResponse);
      response = await fetch(input, {
        headers: await buildHeaders(),
        ...init,
      });
    }
  }
  return response;
};

export const refreshToken = async () => {
  const refreshToken = (await loadFormData('refreshToken')) as string;
  return fetch(refreshUrl, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${refreshToken}`,
      rid: 'session',
    }),
  });
};

export const getUser = async () => {
  return await fetchWhenAuth(getUserUrl);
};

export const updateUser = async (data: object) => {
  return await fetchWhenAuth(updateUserProfileUrl, {
    method: 'put',
    body: JSON.stringify(data),
  });
};

export const adminApproveUserUpdate = async (data: object) => {
  return await fetchWhenAuth(verifyuserDetailsUrl,{
    method: 'post',
    body: JSON.stringify(data),
  });
};

export const getManagers = async () => {
  try {
    const response = await fetchWhenAuth(getManagersUrl, {
      method: 'get'
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const newGetManagers = async () => {
  return await fetchWhenAuth(getManagersUrl);
};

export const UpdateManager = async (data: object) => {
  try {
    const response = await fetchWhenAuth(updateManagerUrl, {
      method: 'put',
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getLoanProduct = async () => {
  try {
    const response = await fetchWhenAuth(LoanProductUrl, {
      method: 'get'
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createLoanProduct = async (data: any) => {
  try {
    const response = await fetchWhenAuth(LoanProductUrl, {
      method: 'post',
      body: JSON.stringify({
        name : data.name, 
        type: data.type,
        terms_and_conditions : "bb123HTTTUOyyO",
        interest_rate: data.interest_rate, 
        amount: data.amount,
        payment_frequency : data.payment_frequency,
        payment_period : data.payment_period,
      }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getLoanProductById = async (id: any) => {
  try {
    const response = await fetchWhenAuth(`${LoanProductUrl}/${id}`, {
      method: 'get'
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateLoanProduct = async (data: any) => {
  try {
    const response = await fetchWhenAuth(LoanProductUrl, {
      method: 'put',
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLoanProduct = async (id: any) => {
  try {
    const response = await fetchWhenAuth(`${LoanProductUrl}/${id}`, {
      method: 'delete'
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomers = async () => {
  try {
    const response = await fetchWhenAuth(getCustomersUrl, {
      method: 'get'
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerData = async(id: any) => {
  return await fetchWhenAuth(`${getCustomerDataUrl}/${id}`);
};

export const updateCustomer = async (data: any) => {
  try {
    const response = await fetchWhenAuth(updateCustomerUrl, {
      method: 'put',
      body: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

//Disburse payment
export const getAllDisbursements = async() => {
  return await fetchWhenAuth(disbursementUrl);
};

export const disbursePayment = async(data: any) => {
  return await fetchWhenAuth(disbursepaymentUrl, {
    method: 'post',
    body: JSON.stringify(data)
  });
};

//Guarantors
export const getGuarantors = async() => {
  return await fetchWhenAuth(guarantorUrl);
};

//Loan payments
export const getAllLoanPayments = async() => {
  return await fetchWhenAuth(getAllLoanPaymentsUrl);
};

export const signUp = async (data: object) => {
  return await fetchWhenAuth(signUpUrl, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(buildAuthServerBody(data)),
  });
};

export const signUpManager = async (data: object) => {
  return await fetchWhenAuth(managerUrl, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(data),
  });
};

export const signIn = async (data: object) => {
  return await fetchWhenAuth(signInUrl, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(buildAuthServerBody(data)),
  });
};

export const logout = async () => {
  const token = await loadFormData('accessToken');
  return await fetch(logoutUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
        'st-auth-mode': 'emailpassword',
      }),
    },
  });
};

export const createUser = async (data: object) => {
  return await fetchWhenAuth(createUserUrl, {
    method: 'post',
    body: JSON.stringify(data),
  });
};

export const verifyUserDetails = async (data: object) => {
  return await fetch(verifyDetailsUrl, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify(data),
  });
};

//Clients
export const getUserById = async (id: string) => {
  return await fetchWhenAuth(`${getUserByIdUrl}/${id}`);
};

//Loan Applications
export const getLoanApplications = async () => {
  return await fetchWhenAuth(getLoanApplicationsUrl);
};

export const assignRmToLoan = async (loanId: string, rmId: string) => {
  return await fetchWhenAuth(`${assignRmToLoanUrl}`, {
    method: 'post',
    body: JSON.stringify({
      loan_application: loanId,
      relationship_manager: rmId,
    }),
  });
};

export const managerApproveLoan = async (loanId: string, approve: boolean, message: string) => {
  return await fetchWhenAuth(`${managerApprovesLoanUrl}`, {
    method: 'put',
    body: JSON.stringify({
      id: loanId,
      approval: approve,
      message: message,
    }),
  });
};

export const getLoanApplicationByStatus = async (status: string) => {
  return await fetchWhenAuth(`${getLoanApplicationsByStatusUrl}/${status}`);
};

//Payments
export const getLoanPayments = async (laonId: string, limit = 100) => {
  return await fetchWhenAuth(`${getUserLoanPaymentsUrl}/${laonId}/${limit}`);
};

//Guarantors
export const getGuarantorById = async(id: any) => {
  return await fetchWhenAuth(`${guarantorUrl}/id/${id}`);
};

//Misc
export const getFileLink = (fileId = '') => {
  return `${getFileUrl}/${fileId}`;
};

export const getFileData = async (fileId = '') => {
  return await fetchWhenAuth(`${getFileDataUrl}/${fileId}`);
};
