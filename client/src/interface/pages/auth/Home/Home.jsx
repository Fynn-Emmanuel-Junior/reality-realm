import MainLayout from "../../../components/layouts/MainLayout"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import ListingItem from "../../../components/pageComponents/SearchComponents/ListingItem"
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import {Navigation} from 'swiper/modules'

const Home = () => {
    SwiperCore.use([Navigation])

    const [offerlistings,setOfferListings] = useState([])
    const [salelistings,setSaleListings] = useState([])
    const [rentlistings,setRentListings] = useState([])

    // console.log(salelistings)
    console.log(offerlistings)

    useEffect(() => {
        const fetchOfferlistings = async () => {
            try {
                const res = await fetch('/api/listings/get?offer=true&limit=4')
                const data = await res.json()
                setOfferListings(data)
                fetchRentlistings()
            } catch(err) {
                console.log(err.message)
            }
        }

        const fetchRentlistings = async () => {
            try {
                const res = await fetch('/api/listings/get?typeOfPlace=rent&limit=4')
                const data = await res.json()
                setRentListings(data)
                fetchSalelisting()
                
            } catch(err) {
                console.log(err.message)
            }
        }

        const fetchSalelisting = async () => {
            try {
                const res = await fetch('/api/listings/get?typeOfPlace=sell&limit=4')
                const data = await res.json()
                setSaleListings(data)
            } catch(err) {
                console.log(err.message)
            }
        }

        fetchOfferlistings()
    },[])

  return (
    <MainLayout>
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
            <h1 className="text-slate-700 font-semibold text-3xl lg:text-6xl">
                Find your next 
                    <span className="text-slate-500"> perfect </span> <br />
                place with ease
            </h1>
            <div className="text-gray-500 sm:text-sm">
                Reality Realm will help you find your home fast, easy and comfortable<br/>
                Our expert support are always available.
            </div>
            <Link to={'/search'} className="text-slate-800 font-bold text-xs sm:text-sm">
                Explore now... 
            </Link>
        </div>
        <div className="">
            {
                offerlistings && offerlistings.length > 0 && (
                    <Swiper navigation>
                        {
                            offerlistings.map(listing => (
                                <SwiperSlide key={listing._id}>
                                    {/* <div style={{background: `url(${listing.imageurls[0]}) center no-repeat`, backgroundSize: 'cover'}} className=' w-full h-[500px]'>
                                        
                                    </div> */}
                                    <img src={listing.imageurls[0]} alt="listing cover"  className=' w-full h-[500px] object-cover'/>
                                </SwiperSlide>   
                            ))
                        }

                    </Swiper>
                )
            }
        </div>
        <div className="flex flex-col lg:flex-row px-3 max-w-6xl mx-auto my-7">
            {
                offerlistings && offerlistings.length > 0 && (
                    <div className="">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-700"> Recent offers</h2>
                            <Link className="text-sm text-blue-800" to={'/search?offer=true'}>
                                Show more offers
                            </Link>
                        </div>
                        <div className="flex flex-col lg:flex-row  max-w-6xl mx-auto">
                            {
                                offerlistings.map(listing => <ListingItem key={listing._id} listing={listing}/>)
                            }
                        </div>
                    </div>    
                )
            }
        </div>
        <div className="flex flex-col lg:flex-row px-3 max-w-6xl mx-auto">
            {
                salelistings && salelistings.length > 0 && (
                    <div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-700"> Recent sales</h2>
                            <Link className="text-sm text-blue-800" to={'/search?sell=true'}>
                                Show more sales
                            </Link>
                        </div>
                        <div className="flex flex-col lg:flex-row  max-w-6xl mx-auto">
                            {
                                salelistings.map(listing => <ListingItem key={listing._id} listing={listing}/>)
                            }
                        </div>
                    </div>    
                )
            }
        </div>
        <div className="flex flex-col lg:flex-row px-3 max-w-6xl mx-auto">
            {
                rentlistings && rentlistings.length > 0 && (
                    <div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-700"> Recent rentals</h2>
                            <Link className="text-sm text-blue-800" to={'/search?rent=true'}>
                                Show more rentals
                            </Link>
                        </div>
                        <div className="flex flex-col lg:flex-row  max-w-6xl mx-auto">
                            {
                                rentlistings.map(listing => <ListingItem key={listing._id} listing={listing}/>)
                            }
                        </div>
                    </div>    
                )
            }
        </div>
        
    </MainLayout>
  )
}

export default Home