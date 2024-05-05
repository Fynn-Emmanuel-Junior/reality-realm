import React , {useEffect,useState,useRef}from 'react'
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
import ListingSkeleton from '../../../components/customs/ListingSkeleton'
import useEmblaCarousel from 'embla-carousel-react'
import Carousel from '../../../components/pageComponents/smallScreens/Carousel'


const uri = 'https://reality-realm-server.onrender.com'

const Listing = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  //carousel 
  const [emblaRef] = useEmblaCarousel()

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
		console.log(data)
  
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

  console.log(listing.imageurls)


  return (
    <> 
		<SearchNavBar />
		<Navbar />
		<main className='w-screen lg:w-11/12 md:mx-auto'>
      <div>
        {
        	loading ? <ListingSkeleton />  : <h2 className='text-2xl font-medium m-5'> {listing.name} </h2>
        }
      </div>
	  {/* Small Screens  */}
	  <div className='md:hidden border border-red-600 flex'>
		<Carousel images={listing.imageurls}/> 
    	{/* <Card listing={listing}/> */}
	  </div>
			
		
		</main>  
		<div className='mt-10'>
		{
			!loading && <Footer />
		}
		</div>     
    </>
    
  )
}

export default Listing