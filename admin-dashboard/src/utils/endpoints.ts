//TODO: move to .env
export const apiUrl = 'http://localhost:3500';
// export const apiUrl = 'http://localhost:3000/api/v1';
// export const apiUrl = 'https://afasha.serveo.net/api/v1';
//export const apiUrl = 'https://6072-41-210-146-120.ngrok-free.app/api/v1';

//auth endpoints
// export const sendOtpUrl = `${apiUrl}/sms/sendotp`;
export const signUpUrl = `${apiUrl}/auth/signup`;
export const verifyDetailsUrl = `${apiUrl}/customer/check_details`;
export const refreshUrl = `${apiUrl}/auth/session/refresh`;
export const apiBasePath = `${apiUrl}/auth`;
export const createUserUrl = `${apiUrl}/manager/super-admin`;

// Signin && Logout endpoints
export const signInUrl = `${apiUrl}/auth/signin`;
export const logoutUrl = `${apiUrl}/auth/signout`;

export const getUserUrl = `${apiUrl}/customer/get-logged-in-user`;
export const updateUserProfileUrl = `${apiUrl}/customer/update-user`;

//Managers endpoints
export const managerUrl = `${apiUrl}/manager`;
export const getManagersUrl = `${apiUrl}/manager/managers`;
export const updateManagerUrl = `${apiUrl}/manager`;

//Loanproduct endpoints
export const LoanProductUrl = `${apiUrl}/loans/product`;

//Customer endpoints
export const getCustomersUrl = `${apiUrl}/customer`;
export const createCustomersUrl = `${apiUrl}/dashboard/user`;
export const deleteCustomerUrl = `${apiUrl}/dashboard/mobile/user`;
export const updateCustomerUrl = `${apiUrl}/customer/manager-update-user`;
export const verifyuserDetailsUrl = `${apiUrl}/customer/verify-user-details`;
export const getCustomerDataUrl = `${apiUrl}/customer/getUserById`;

//Loan Applications endpoints
export const getLoanApplicationsUrl = `${apiUrl}/loans/application`;
export const getLoanApplicationsByStatusUrl = `${apiUrl}/loans/application/status`;
export const assignRmToLoanUrl = `${apiUrl}/loans/application/assign-rm-to-loan`;
export const managerApprovesLoanUrl = `${apiUrl}/loans/application/manager-approves-loan`;

//Clients endpoints
export const getUserByIdUrl = `${apiUrl}/customer/getUserById`;

//Payments
export const getUserLoanPaymentsUrl = `${apiUrl}/payment/get-user-loan-payments`;

//Admin payments
export const getAllLoanPaymentsUrl = `${apiUrl}/payment`;

//Misc
export const getFileUrl = `${apiUrl}/attachment/files/get-file`;
export const getFileDataUrl = `${apiUrl}/attachment/files/get-file-data`;

//Disbursements endpoints
export const disbursementUrl = `${apiUrl}/payment/disbursements`;
export const disbursepaymentUrl = `${apiUrl}/payment/makeMobileMoneyTransfer`;

//Guarantor endpoints
export const guarantorUrl = `${apiUrl}/guarantor`;
