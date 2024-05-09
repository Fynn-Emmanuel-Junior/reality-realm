import React , {useEffect,useState}from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import SearchNavBar from '../../../components/pageComponents/Search/SearchNavBar'
import Navbar from '../../../components/pageComponents/smallScreens/Navbar'
import Card from '../../../components/pageComponents/listing/Card'
import Footer from '../../../components/pageComponents/Footer'
import ListingSkeleton from '../../../components/customs/ListingSkeleton'
import { setImages } from '../../../../logic/ReduxStore/features/listings/CarouselSlice'
import { selectImages } from '../../../../logic/ReduxStore/features/listings/CarouselSlice'
import { IoLocationOutline,IoBedOutline } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { GrElevator } from "react-icons/gr";


const uri = 'https://reality-realm-server.onrender.com'

const Listing = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  //carousel 
  const dispatch = useDispatch()
  const images = useSelector(selectImages)
  
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

		dispatch(setImages(listing.imageurls))
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
        	loading ? <ListingSkeleton />  : <div>
				<div className='w-11/12 mx-auto md:hidden'>
    				<Card listing={listing}/>
	  			</div>
				<div className='flex flex-col md:hidden'>
					<div className='w-11/12 mx-auto'>
						<h2 className='text-3xl font-medium'> {listing.name} </h2>
						<h3 className='m-2'> {listing.description} </h3>
						<div className='flex items-center gap-1 mt-3'>
							<div> 
								<IoLocationOutline size={25} color='#228B22'/>
							</div>
							<p>{listing.address}</p>
						</div>
						<div className='mt-2 flex items-center gap-3 '> 
							<div className='flex items-center gap-1'>
								<BiBath size={25}/>
								<span className='text-base'>{listing.bathrooms}</span>
							</div>
							<div className='bg-black w-3 h-3 rounded-full'></div>
							<div className='flex items-center gap-1'>
								<IoBedOutline size={25}/>
								<span className='text-base'>{listing.bedrooms}</span>
							</div>
						</div>
						<div className='border border-black border-b-[1px] mt-3 border-opacity-30'/>

						<div>
							<h2 className='text-2xl font-medium my-3'> Amenities </h2>
							<div className='grid grid-cols-2 gap-3'>
								<div className='border border-blue-900 p-5 rounded-lg '>
									<LiaUserAstronautSolid size={25} />
									<h3> Doorman </h3>
								</div>
								<div className='border border-blue-900 p-5 rounded-lg flex flex-col gap-3'>
									<GrElevator size={25} />
									<h3> Elevator </h3>
								</div>
							</div>

						</div>
					</div>
				</div>
				
			</div>
        }
      </div>
	  {/* Small Screens  */}
	  
			
		
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