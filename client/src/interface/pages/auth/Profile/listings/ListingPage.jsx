import React , {useEffect,useState}from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import MainLayout from '../../../../components/layouts/MainLayout'


const ListingPage = () => {
  SwiperCore.use([Navigation])

  const {id} = useParams()
  console.log(id)
  
  const [listing,setlisting] = useState({})
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)


  useEffect(() => {
    const fetchlisting = async () => {
      
      try {
        setLoading(true)
        setError(true)

        const res = await fetch(`/api/listings/getlisting/${id}`)
    
        const data = await res.json()
        console.log(data)
        
        setlisting(data)
        setLoading(false)
        
        
      } catch(err) {
        setError(true)
        setLoading(false)
      }
    }
    
    fetchlisting()
  },[])

  return (
    <MainLayout>
      <main>
       
      {
        listing && listing.imageurls ? <>
          <Swiper navigation>
            {
              listing.imageurls.map((url,index) => (
                <SwiperSlide key={index}>
                  <div className='h-full sm:h-[550px]'>
                    <img src={url} alt="" className='w-full object-contain ' />
                  </div>
                </SwiperSlide>
              ))
            }

          </Swiper>
        </> : ''
      }
      </main>
    </MainLayout>
  )
}

export default ListingPage