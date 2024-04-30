import MainLayout from "../../../components/layouts/MainLayout"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import ListingItem from "../../../components/pageComponents/Search/ListingItem"
import Footer from "../../../components/pageComponents/Footer"
import { Circles } from 'react-loader-spinner'
import { selectStatus ,selectListings,selectError} from "../../../../logic/ReduxStore/features/listings/listingsSlice"
import {useSelector,useDispatch} from 'react-redux'
import { fetchListings } from "../../../../logic/ReduxStore/features/listings/listingsSlice"

const Home = () => {
    // const listings = useSelector(selectListings)
    // const loading = useSelector(selectStatus)
    // const error = useSelector(selectError)
    // const dispatch = useDispatch()
    const [listings,setListings] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    
    const [loadmore,setLoadmore] = useState(false)
    const [text,setText] = useState(false)


    useEffect(() => {
            const fetchlistings = async () => {
                try {
                    const res = await fetch(`/api/listings/get-all-listings?limit=16`)
                    const data = await res.json()

                    setListings(data)
                    setTimeout(() => {
                        setLoading(false)
                    },2000)
                } catch(err) {
                    console.log(err.message)
                    setLoading(false)
                }
            }

            fetchlistings()

            // dispatch(fetchListings())
    },[])


    const showmore = async() => {
        const startIndex = listings.length
        setText(true)

        try {
            const res = await fetch(`api/listings/get-all-listings?startIndex=${startIndex}&&limit=4`)
            const data = await res.json()

           if(data) {
            setListings([...listings,...data])

            setTimeout(() => {
                setText(false)
            },100)

           } else {
            console.log('cannot get more listings')
            setText(false)
           }

        } catch(err) {
            console.log(err.message)
            
        }
    }

  return (
    <div>
        <MainLayout>
            <div className="w-full font-sansSerif">
                <div className='w-full mt-5'>
                    <div className="flex items-center  flex-wrap gap-3 w-[90%]  md:w-[95%] md:grid md:grid-cols-2 lg:w-full lg:grid-cols-3 xl:w-[90%] xl:grid-cols-4 2xl:grid-cols-5 mx-auto">
                        {
                            listings.map(listing => (
                                <ListingItem key={listing._id} listing={listing} loading={loading}/>
                            ))
                        }        
                    </div>   
                </div>
            </div>
            <div className='flex flex-col items-center mt-5 mb-10'>
                <div className="flex flex-col items-center w-1/3 lg:w-1/4 bg-slate-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80 cursor-pointer">
                    <button> Load more </button>
                </div>
            </div>   
        </MainLayout>
        <div className="mt-5">
            <Footer />
        </div>
    </div>
  )
}

export default Home