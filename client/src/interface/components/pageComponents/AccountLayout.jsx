import React from 'react'
import { Outlet } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

const AccountLayout = () => {
  return (
    <div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default AccountLayout