import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { selectCurrentUser } from '../../../../logic/ReduxStore/features/users/usersSlice'
import {useSelector} from 'react-redux'

const SearchNavBar = () => {
    const currentuser = useSelector(selectCurrentUser)
    const [open,setOpen] = useState(false)
	
	const handleOpen = () => {
		setOpen(true)
	}
  
  return (
    <nav className='lg:sticky lg:top-0 w-screen  lg:p-4 lg:z-30 lg:bg-white'>
        <div className='hidden lg:inline'>
            <div className='lg:w-3/5 mt-5 lg:mt-0 flex justify-between items-center ml-6'>
                <Link to='/'>
                    <p className='text-3xl font-bold text-slate-800 cursor-pointer'>RealityRealm</p>
                </Link>
                <div>
                    <div className='flex gap-6 w-full items-center xl:p-2 text-base'>
                        <div className='cursor-pointer'>
                            <Link to='/search'>
                                Buy
                            </Link>	
                        </div>
                        <div className='cursor-pointer'>
                            <Link to='/search'>
                                Sell
                            </Link>	
                        </div>
                        <div className='cursor-pointer'>
                            <Link to='/contact'>
                                Contact us
                            </Link>	
                        </div>
                        <div className='cursor-pointer'>
                            <Link to='/about'>
                                About
                            </Link>	
                        </div>
                        <div className='cursor-pointer'>
                            {
                                !currentuser && <Link to='/signin'>
                                Signin
                            </Link>	
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default SearchNavBar