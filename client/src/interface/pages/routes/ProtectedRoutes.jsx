import React from 'react'
import { Outlet,Navigate,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../logic/ReduxStore/features/users/usersSlice'

const ProtectedRoutes = () => {
    const currentuser = useSelector(selectCurrentUser)
    const location = useLocation()
  return  currentuser ? <Outlet /> : <Navigate to='/signin'  state={{from : location}} replace/>
}

export default ProtectedRoutes