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
import { IoLocationOutline,IoBedOutline,IoShieldCheckmarkOutline } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { GrElevator } from "react-icons/gr";
import { GiKitchenKnives } from "react-icons/gi";
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import profile from '../../../assets/profile.png'
import { GoSponsorTiers } from "react-icons/go";
import { LuParkingCircle } from "react-icons/lu";


const uri = 'https://reality-realm-server.onrender.com'

const Listing = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [user,setUser] = useState({})
  console.log(user)

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

	const fetchUser = async () => {
		try {
			const res = await fetch(`http://localhost:3500/users/${listing.userRef}`)	
			const data = await res.json()

			setUser(data)
			console.log(data)

		} catch(err) {
			console.log(err.message)
		}
	}
    
    fetchlisting()
	fetchUser()

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
						<h2 className='text-3xl font-medium'> {listing.name} <span className='text-lg'> {listing.description} </span> </h2>
						<h3 className='font-medium text-lg'>Entire serviced Apartment in Accra, Ghana</h3>

						<div className='flex items-center gap-3 mt-3'>
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
						</div>
						<div>
							{listing.typeOfPlace == 'sell' ?  <p className='font-medium'> For sale : ${listing.regularPrice}</p>: <p className='font-medium'> Rent : <span> ${listing.regularPrice} per month </span></p>}
						</div>

						<div className='border border-black border-b-[0.5px] my-5 border-opacity-20'/>

						<div>
							<h2 className='text-2xl font-medium my-3'> Amenities </h2>
							<div className='flex gap-3 w-full'>
								<div  className='border p-5 rounded-xl flex gap-3 w-1/2'>
									<LiaUserAstronautSolid size={25} className='text-blue-900'/>
									<h3> Doorman </h3>
								</div>
								<div  className='border p-5 rounded-xl flex gap-3 w-1/2'>
									<GrElevator size={25} className='text-blue-900'/>
									<h3> Elevator </h3>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-3 mt-4'>
								<div className='p-5 rounded-lg flex gap-3 border'>
									<GiKitchenKnives size={25} className='text-blue-900'/>
									<h3> Doorman </h3>
								</div>
								<div className='p-5 rounded-lg flex gap-3 border'>
									<BsHouseDoor size={25} className='text-blue-900'/>
									<h3> Furnished </h3>
								</div>
							</div><div className='grid grid-cols-2 gap-3 mt-4'>
								<div className='p-5 rounded-lg flex gap-3 border'>
									<MdOutlineLocalLaundryService size={25} className='text-blue-900'/>
									<h3> Laundry Service </h3>
								</div>
								<div className='p-5 rounded-lg flex gap-3 border'>
									<CiLock size={25} className='text-blue-900'/>
									<h3> Storage available </h3>
								</div>
							</div>
						</div>
						<div className='border border-black border-b-[0.5px] my-5 border-opacity-20'/>

						<div className='flex gap-3'>
							{
								user ? <img 
									src={user.avatar} 
									width={60} 
									height={60}
									className="rounded-full object-cover self-center mt-2 cursor-pointer"
								/> : <img 
									src={profile} 
									alt='picture_profile'
									width={60} 
									height={60}
									className="rounded-full object-cover self-center mt-2 cursor-pointer"
								/>
							}
							<div className='mt-3'>
								<p className='font-medium'> Hosted by {user.username || 'Fynn Emmanuel Junior'} </p>
								<p> 3 years of hosting </p>
							</div>
						</div>
						<div className='border border-black border-b-[0.2px] my-5 border-opacity-10'/>

						<div className='flex flex-col gap-3'>
							<div className='flex items-start gap-3 mt-7'>
								<GoSponsorTiers size={25}/>
								<div>
									<h2 className='font-medium'>{user.username || 'Fynn'} is a superhost</h2>
									<h3>Superhosts are experienced, highly rated Hosts.</h3>
								</div>
							</div>
							<div className='flex items-start gap-3 mt-5'>
								<LuParkingCircle size={25}/>
								<div>
									<h2 className='font-medium'> Park for free </h2>
									<h3> This is one of the few places in the area with free parking </h3>
								</div>
							</div>
							<div className='flex items-start gap-3 mt-5'>
								<IoShieldCheckmarkOutline size={25}/>
								<div>
									<h2 className='font-medium'> Self check-in</h2>
									<h3> You can with the building staff </h3>
								</div>
							</div>
						</div>
						<div className='border border-black border-b-[0.2px] my-5 border-opacity-10'/>

						<div className='bg-[#F0EFE9] p-5 rounded-xl'>
							<p className='leading-7'>
								Truly, all you need is your luggage as you kick back and relax in this stylish studio that offers extra space and comfort as complimentary
							</p>
						</div>
						<div className='border border-black border-b-[0.5px] my-5 border-opacity-20'/>

						<div className='flex flex-col gap-3'>
							<div>
								<h3 className='font-medium text-2xl'> House rules </h3>
							</div>
							<div className='flex flex-col gap-3'>
								<p> Check-in after 2:00PM</p>
								<p>Check out after 11:00AM</p>
								<p> 2 guests Maximum</p>
							</div>
						</div>
						<div className='border border-black border-b-[0.5px] my-5 border-opacity-20'/>

						<div className='flex flex-col gap-3'>
							<div>
								<h3 className='font-medium text-2xl'> Safety & property </h3>
							</div>
							<div className='flex flex-col gap-3'>
								<p> No carbonmonoxiode alarm</p>
								<p> Smoke alarm </p>
							</div>
						</div>
						
						<div className='bg-pink-800 p-3 mt-5 rounded-md'>
							<div className='flex flex-col items-center'>
								<button className='text-white'> Book appointement</button>
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