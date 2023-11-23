import {FaSearch} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../logic/ReduxStore/features/users/usersSlice'
import { useEffect, useState } from 'react'

const Header = () => {
    const currentuser = useSelector(selectCurrentUser)
    const [searchquery,setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlparams = new URLSearchParams(window.location.search)
        urlparams.set('searchquery',searchquery)

        const searchTerm = searchquery.toString()
        navigate(`/search?${searchTerm}`)
    }

    useEffect(() => {
        const urlparams = new URLSearchParams(window.location.search)
        const searchTerm = urlparams.get('searchquery',searchquery)

        setSearchQuery(searchTerm)
    },[location.search])

  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500"> Reality </span>
                    <span className="text-slate-700"> Realm </span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center gap-3">
                <input 
                    type="text"  
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none w-32 sm:w-64 text-sm sm:text-base"
                    value={searchquery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type='submit'>
                    <FaSearch 
                        className='text-slate-700'
                    />
                </button>
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