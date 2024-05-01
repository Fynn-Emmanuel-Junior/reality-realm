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
  const [contact,setContact] = useState(false)
  const [landlord,setLandlord] = useState(false)


  useEffect(() => {

    setLandlord(true)

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
        setLoading(false)
      }
    }
    
    fetchlisting()

  },[])

  const handleSignin = () => {
    if(!user) return navigate('/signin')

    if(user) return setContact(true)
    setLandlord(false)

  }

  console.log(listing)

  return (
    <> 
		<SearchNavBar />
		<Navbar />
		<main className='w-screen lg:w-11/12 md:mx-auto'>
			<div className='flex flex-col lg:flex-row lg:justify-between'>
				<div className='flex items-center gap-3'>
					<p className='text-blue-950 font-bold text-xl'> Explore </p>
					<span>
						<MdOutlineArrowForwardIos />
					</span>
					<span> {listing.name} </span>
				</div>
				<div className='border border-blue-950 flex items-center p-3 w-screen lg:w-1/3 rounded-xl'>
					<input 
						type='text'
						id='search'
						name='searchTerm'
						placeholder='Search...'
						className='focus:outline-none w-full'
					/>
					<CiSearch />
				</div>
			</div>
			<div className='flex flex-col lg:flex-row lg:mt-10'>
				<section className=''>
					<Card listing={listing}/>
				</section>
				<section className='flex-1'>
          <div>
            <p>{listing.name}</p>
            <p>{listing.address}</p>
          </div>
				</section>
			</div>
		</main>  
    <div className='mt-10'>
      <Footer />
    </div>     
    </>
    
  )
}

export default Listing