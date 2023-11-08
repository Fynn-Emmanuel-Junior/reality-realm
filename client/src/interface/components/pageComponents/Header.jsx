import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../logic/ReduxStore/features/users/usersSlice'

const Header = () => {
    const currentuser = useSelector(selectCurrentUser)

  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500"> Reality </span>
                    <span className="text-slate-700"> Realm </span>
                </h1>
            </Link>
            <form className="bg-slate-100 p-3 rounded-lg flex items-center gap-3">
                <input 
                    type="text"  
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none w-32 sm:w-64 text-sm sm:text-base" 
                />
                <FaSearch 
                    className='text-slate-700'
                />
            </form>
            <ul className='flex justify-between items-center gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline '> Home </li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'> About </li>
                </Link>
                <Link to='/profile'>
                    {
                        currentuser ? 
                            <img 
                                src={currentuser.avatar} 
                                alt="profile"
                                className='rounded-full h-7 w-7 object-cover'
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