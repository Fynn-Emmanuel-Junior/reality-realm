import React from 'react'
import { MdClose } from "react-icons/md"
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { selectMenu } from '../../../logic/ReduxStore/features/menu/menuSlice'
import { setMenu } from '../../../logic/ReduxStore/features/menu/menuSlice'

const Menu = ({open,setOpen}) => {
    const menu = useSelector(selectMenu)
    const dispatch =  useDispatch()

    const handleOpen = () => {
        setOpen(false)

        dispatch(setMenu(false))
    }

  return (  
    <>
        {
            open && (

    <div className={`border border-red-600 absolute top-0 left-0 ${menu ? 'z-50': 'z-10'} bg-white w-screen h-screen lg:hidden`}>
            <div className='w-screen h-screen'>
                <div className='border-b-2'>
                    <div className='w-4/5 xxs:w-[72%] md:w-2/3 flex justify-between items-center p-2 sm:p-3 md:p-6'> 
                        <MdClose className='text-blue-600 text-2xl' onClick={handleOpen}/>
                        <h1 className='text-lg sm:text-xl md:text-4xl font-semibold text-blue-600'> RealityRealm </h1>
                    </div>
                </div> 
                <div>
                    <div className='text-slate-900 p-2 sm:p-3 md:p-6  font-semibold md:text-2xl'>
                        <div className='border-b-2 p-2 sm:p-3 md:p-6  hover:underline hover:transition-underline hover:duration-100 hover:ease-linear '>
                            <Link to='/' className={`${location.pathname === '/'? 'text-blue-600' : 'text-slate-900'}`}>
                                Home
                            </Link>
                        </div>
                        <div className='border-b-2 p-2 sm:p-3 md:p-6 '>
                            <Link to='/search' className={`${location.pathname === '/search'? 'text-blue-600' : 'text-slate-900'}`}>
                                Explore listings
                            </Link>
                        </div>
                        <div className='border-b-2 p-2 sm:p-3 md:p-6 '>
                            <Link to='/about' className={`${location.pathname === '/about'? 'text-blue-600' : 'text-slate-900'}`}>
                                About 
                            </Link>
                        </div>
                        <div className='border-b-2 p-2 sm:p-3 md:p-6'>
                            <Link to='/contact' className={`${location.pathname === '/contact'? 'text-blue-600' : 'text-slate-900'}`}>
                                Contact us 
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    </div>
            )
        }
    </>
  )
}

export default Menu