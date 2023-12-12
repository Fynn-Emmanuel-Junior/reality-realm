import React from 'react'
import { Outlet,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../logic/ReduxStore/features/users/usersSlice'

const ProtectedRoutes = () => {
  const currentuser = useSelector(selectCurrentUser)
  return  currentuser ? <Outlet /> : <Navigate to='/signin'/>
}

export default ProtectedRoutes