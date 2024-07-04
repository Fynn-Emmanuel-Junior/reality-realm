import { Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../logic/ReduxStore/features/users/usersSlice'

const Header = () => {
    const currentuser = useSelector(selectCurrentUser)
    
  return (
    <header className=' w-[85%] mx-auto'>
        <div className="flex justify-between my-7">
            <ul className='flex gap-8'>
                <Link to='/serach'>
                    <li className='hidden md:inline text-slate-700 hover:underline'> Rent </li>
                </Link>
                <Link to='/search'>
                    <li className='hidden md:inline text-slate-700 hover:underline'> Buy </li>
                </Link>
                <Link to='/search'>
                    <li className='hidden md:inline text-slate-700 hover:underline'> Sell </li>
                </Link>
                <Link to='/about'>
                    <li className='hidden md:inline text-slate-700 hover:underline'> Contact Us </li>
                </Link>
            </ul>

            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-3xl flex flex-wrap">
                    <span className="text-slate-500"> Reality </span>
                    <span className="text-slate-700"> Realm </span>
                </h1>
            </Link>
            <ul className='flex items-center gap-8'>
                <Link to='/'>
                    <li className='hidden md:inline text-slate-700 hover:underline '> Home </li>
                </Link>
                <Link to='/about'>
                    <li className='hidden md:inline text-slate-700 hover:underline '> About </li>
                </Link>
                <Link to='/profile'>
                    {
                        currentuser ? 
                            <img 
                                src={currentuser.avatar} 
                                alt="profile"
                                className='rounded-full h-7 w-7 object-cover mr-3 md:mr-0'
                            /> :
                            <li className='text-slate-700 hover:underline'> Sign In </li>     
                    }
                </Link> 
            </ul>

        </div>
    </header>
  )
}

export default Header