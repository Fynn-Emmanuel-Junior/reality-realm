import React , {useEffect,useState}from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../../../logic/ReduxStore/features/users/usersSlice'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";
import 'swiper/css/bundle'
import MainLayout from '../../../../components/layouts/MainLayout'
import Contact from '../../../../components/customs/Contact'


const Listing = () => {
  SwiperCore.use([Navigation])

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

        const res = await fetch(`/api/listings/getlisting/${id}`)
    
        const data = await res.json()
  
        setlisting(data)
        setLoading(false)
  
      } catch(err) {
        setError(true)
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

  return (
    <MainLayout>
      <main> 
      {
        listing && listing.imageurls ? <>
          <Swiper navigation>
            {
              listing.imageurls.map((url,index) => (
                <SwiperSlide key={index}>
                  <div className=' w-full h-[400px]'>
                    <img src={url} alt="" className='w-full h-full object-cover ' />
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.Offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.discountPrice > 0  && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${listing.regularPrice - listing.discountPrice} discount off
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-700 text-sm font-semibold flex gap-4 sm:gap-6 flex-wrap'>
                <li className='flex items-center gap-2 text-green-700 text-sm font-semibold'> 
                  <FaBed className='text-lg'/>
                  {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }
                </li>
                <li className='flex items-center gap-2 text-green-700 text-sm font-semibold'> 
                  <FaBath className='text-lg'/>
                  {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bedrooms} bath` }
                </li>
                <li className='flex items-center gap-2 text-green-700 text-sm font-semibold'> 
                  <FaParking className='text-lg'/>
                  {listing.parking ? 'Parking spot' : 'No Parking' }
                </li>
                <li className='flex items-center gap-2 text-green-700 text-sm font-semibold'> 
                  <FaChair className='text-lg'/>
                  {listing.furnished ? 'Furnished' : 'Unfurnished' }
                </li>
                
            </ul>
             <>
              {
                landlord && !contact ? <button className='bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 p-3' onClick={handleSignin}>  contact landlord
                </button>   : ''
              }
            
            </>
            <>
              {contact && <Contact listing={listing}/>}
            </>
            
          </div>
          
        </> : ''
      }
      
      </main>
    </MainLayout>
  )
}

export default Listing