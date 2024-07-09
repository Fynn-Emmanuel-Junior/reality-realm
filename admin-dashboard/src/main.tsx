import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './redux/app/store';
import "./index.scss";
import Loader from './layout/layoutcomponent/loaders';
import AuthRoutes from './protectedroutes/authRoutes'; // Ensure this path is correct

const App = React.lazy(() => import("./layout/App"));
const Signin = React.lazy(() => import("./pages/auth/signin/signin"));
const Signup = React.lazy(() => import("./pages/auth/signup/signup"));
const EditLoans = React.lazy(() => import("./pages/approvals/editloans"));
const Loans = React.lazy(() => import("./pages/loans/loans"));
const LoansList = React.lazy(() => import("./pages/loansList/loansList"));
const CustomerList = React.lazy(() => import("./pages/customers/customerlist"));
const CustomerProfile = React.lazy(() => import("./pages/customers/customerProfile"));
const EditCustomer = React.lazy(() => import("./pages/customers/editcustomer"));
const CreateUser = React.lazy(() => import("./pages/dashboard-users/createuser"));
const EditUser = React.lazy(() => import("./pages/dashboard-users/edituser"));
const Admins = React.lazy(() => import("./pages/dashboard-users/userslist"));
const ViewApprovals = React.lazy(() => import("./pages/approvals/viewapprovals"));
const Disburments = React.lazy(() => import("./pages/disbursments/viewapprovals"));
const DisbursementHistory = React.lazy(() => import('./pages/disbursments/disburmentHistory'));
const DistributorsList = React.lazy(() => import("./pages/smart inventory/DistributorsList"));
const AddDistributors = React.lazy(() => import("./pages/smart inventory/AddDistributors"));
const EditDistributors = React.lazy(() => import("./pages/smart inventory/EditDistributors"));
const DisableDistributors = React.lazy(() => import("./pages/smart inventory/DisableDistributors"));
const EditCustomerDetails = React.lazy(() => import("./pages/customers/editcustomer"));
const PaymentHistory = React.lazy(() => import("./pages/loansList/paymentHistory"));
const Settings = React.lazy(() => import("./pages/settings/Settings"));
const Products = React.lazy(() => import("./pages/smart inventory/products/ProductsList"));
const EditProduct = React.lazy(() => import("./pages/smart inventory/products/EditProduct"));
const Account = React.lazy(() => import("./pages/settings/Account"));
const Password = React.lazy(() => import("./pages/settings/Password"));
const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard")); 
const LoanProducts = React.lazy(() => import("./pages/loan products/viewLoanProduct"));
const CreateLoanProducts = React.lazy(() => import("./pages/loan products/createLoanProduct"));
const EditLoanProduct = React.lazy(() => import("./pages/loan products/editLoanProduct"));
const GuarantorList = React.lazy(() => import("./pages/guarantors/guarantorList"));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
		<React.Fragment>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<React.Suspense fallback={<Loader />}>
						<Routes>
							<Route index path='/' element={<Signin />} />
							<Route path='/signup' element={<Signup />} />
							<Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
								<Route element={<AuthRoutes />}>
									<Route path='/dashboard' element={<Dashboard />} />
									<Route path='/loans' element={<Loans />} />
									<Route path='/loans-list' element={<LoansList />} />
									<Route path='/customer-list' element={<CustomerList />} />
									<Route path='/edit-customer' element={<EditCustomer />} />
									<Route path='/customer-profile/:id' element={<CustomerProfile />} />
									<Route path='/create-user' element={<CreateUser />} />
									<Route path='/edit-admin-profile/:id' element={<EditUser />} />
									<Route path='/admins' element={<Admins />} />
									<Route path='/view-approvals' element={<ViewApprovals />} />
									<Route path='/view-disburments' element={<Disburments />} />
									<Route path='/disbursement-history' element={<DisbursementHistory />}/>
									<Route path='/edit-loans-approvals' element={<EditLoans />} />
									<Route path='settings' element={<Settings />}>
										<Route path='account' element={<Account />} />
										<Route path='password' element={<Password />} />
									</Route>
									<Route path='/distributors-list' element={<DistributorsList />} />
									<Route path='/add-distributors' element={<AddDistributors />} />
									<Route path='/edit-distributors' element={<EditDistributors />} />
									<Route path='/products' element={<Products />} />
									<Route path='/edit-product' element={<EditProduct />} />
									<Route path='/disable-distributors' element={<DisableDistributors />} />
									<Route path='/edit-customer/:id' element={<EditCustomerDetails />} />
									<Route path='/payment-history' element={<PaymentHistory />} />
									<Route path='/view-loan-products' element={<LoanProducts />}/>
									<Route path='/create-loan-product' element={<CreateLoanProducts />}/>
									<Route path='/edit-loan-product/:id' element={<EditLoanProduct />}/>
									<Route path='/guarantor-list' element={<GuarantorList />}/>
								</Route>
							</Route>
						</Routes>
						</React.Suspense>
					</BrowserRouter>	
				</PersistGate>
			</Provider>
		</React.Fragment>
);
