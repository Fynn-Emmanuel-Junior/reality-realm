/* eslint-disable react-refresh/only-export-components */
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
const CustomerList = React.lazy(() => import("./pages/customers/customerlist"));
const CustomerProfile = React.lazy(() => import("./pages/customers/customerProfile"));
const EditCustomer = React.lazy(() => import("./pages/customers/editcustomer"));
const DistributorsList = React.lazy(() => import("./pages/smart inventory/DistributorsList"));
const AddDistributors = React.lazy(() => import("./pages/smart inventory/AddDistributors"));
const EditDistributors = React.lazy(() => import("./pages/smart inventory/EditDistributors"));
const DisableDistributors = React.lazy(() => import("./pages/smart inventory/DisableDistributors"));
const EditCustomerDetails = React.lazy(() => import("./pages/customers/editcustomer"));
const Settings = React.lazy(() => import("./pages/settings/Settings"));
const Products = React.lazy(() => import("./pages/smart inventory/products/ProductsList"));
const EditProduct = React.lazy(() => import("./pages/smart inventory/products/EditProduct"));
const Account = React.lazy(() => import("./pages/settings/Account"));
const Password = React.lazy(() => import("./pages/settings/Password"));
const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard")); 
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
									<Route path='/customer-list' element={<CustomerList />} />
									<Route path='/edit-customer' element={<EditCustomer />} />
									<Route path='/customer-profile/:id' element={<CustomerProfile />} />
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
