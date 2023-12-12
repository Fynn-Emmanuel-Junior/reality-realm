import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const SearchNavBar = () => {
    const [open,setOpen] = useState(false)
	
	const handleOpen = () => {
		setOpen(true)
	}
  
  return (
    <nav>
        <div className='hidden lg:inline'>
            <div className='lg:w-3/5 mt-5 flex justify-between items-center ml-6'>
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
                            <Link to='/signin'>
                                Signin
                            </Link>	
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default SearchNavBar