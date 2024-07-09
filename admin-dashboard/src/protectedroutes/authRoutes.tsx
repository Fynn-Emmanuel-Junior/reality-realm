import React from 'react';
import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/app/store';

const AuthRoutes: React.FC = () => {
  // const navigate = useNavigate();
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // useEffect(() => {
  //   if (isAuthenticated !== true) {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);
 
  return <Outlet />;
};

export default AuthRoutes;
