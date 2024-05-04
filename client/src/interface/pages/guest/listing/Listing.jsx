import React , {useEffect,useState}from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../../logic/ReduxStore/features/users/usersSlice'
import SearchNavBar from '../../../components/pageComponents/Search/SearchNavBar'
import Navbar from '../../../components/pageComponents/smallScreens/Navbar'
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Card from '../../../components/pageComponents/listing/Card'
import Footer from '../../../components/pageComponents/Footer'
import { TailSpin } from 'react-loader-spinner'


const uri = 'https://reality-realm-server.onrender.com'

const Listing = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const user = useSelector(selectCurrentUser)
  
  const [listing,setlisting] = useState({})
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
 


  useEffect(() => {

    const fetchlisting = async () => {
      try {
        setLoading(true)
        setError(true)

        const res = await fetch(`http://localhost:3500/listings/getlisting/${id}`)
    
        const data = await res.json()
  
        setlisting(data)
        setLoading(false)
  
      } catch(err) {
        setError(true)
        console.log(err.message)
        setLoading(true)
      }
    }
    
    fetchlisting()

  },[])

  console.log(listing)

  return (
    <> 
		<SearchNavBar />
		<Navbar />
		<main className='w-screen lg:w-11/12 md:mx-auto'>
      <div>
        {
        	loading ? <div className='w-11/12 mx-auto'>
				<div className='w-11/12 md:w-[40%] flex flex-col items-center'>
				<div className="w-full  h-8 animate-pulse bg-stone-200 rounded-md my-5"/>	
			</div>

			<div className='md:flex md:items-center md:justify-center md:gap-3 animate-pulse'>
				<div className='w-full md:w-7/12 h-44 bg-stone-200 animate-pulse  rounded-lg md:rounded-l-lg' />
				<div className='hidden md:w-5/12 md:h-44 md:grid md:grid-cols-2 md:gap-2 animate-pulse'>
					<div className='bg-stone-200 rounded-l-lg h-20'/>
					<div className='bg-stone-200 rounded-l-lg h-20'/>
					<div className='bg-stone-200 rounded-l-lg h-20'/>
					<div className='bg-stone-200 rounded-l-lg h-20'/>
				</div>
			</div>

			<div className='hidden md:flex md:justify-center mt-7'>
				<div className='animate-pulse w-full border-black border-b-[1px] border-opacity-20 pb-2'>
					<div className='bg-stone-200 rounded-sm w-80 h-7'/>
					<div className='bg-stone-200 rounded-sm w-64 h-7 mt-2 '/>

				</div>
				<div>
					<div className='animate-pulse bg-stone-200 w-60 h-20' />

				

				</div>

			</div>

			</div>  : <h2 className='text-2xl font-medium m-5'>{listing.name}</h2>
        }
      </div>
			
		
		</main>  
		<div className='mt-10'>
		<Footer />
		</div>     
    </>
    
  )
}

export default Listing