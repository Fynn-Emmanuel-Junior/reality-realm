import MainLayout from "../../../components/layouts/MainLayout"
import { useState,useEffect } from "react"
import ListingItem from "../../../components/pageComponents/Search/ListingItem"
import { Circles } from 'react-loader-spinner'
import {useSelector} from 'react-redux'
import Skeleton from "../../../components/customs/Skeleton"
import { selectMenu } from "../../../../logic/ReduxStore/features/menu/menuSlice"

// const uri = 'https://reality-realm-server.onrender.com'

const Home = () => {
    const [listings,setListings] = useState([]);
    const [loading,setLoading] = useState(true);
    const [loadmore,setLoadmore] = useState(true);
    const [text,setText] = useState(false);

    const menu = useSelector(selectMenu);


    useEffect(() => {
            const fetchlistings = async () => {
                try {
                    const res = await fetch(`http://localhost:3500/listings/get-all-listings`)
                    const data = await res.json()

                    setListings(data)
                     setTimeout(() => {
                        setLoading(false)
                    },500)
                } catch(err) {
                    setLoading(false);
                    throw new Error(err);
                }
            }
            fetchlistings()
            
    },[])


    const showmore = async() => {
        const startIndex = listings.length
        setText(true)

        try {
            const res = await fetch(`http://localhost:3500/listings/get-all-listings?startIndex=${startIndex}&&limit=4`)
            const data = await res.json()

           if(data) {
            setListings([...listings,...data])

            if(data.length < 4) {
                setLoadmore(false)
            }

            setTimeout(() => {
                setText(false)
            },100)

           } else {
            console.log('cannot get more listings')
            setText(false)
           }

        } catch(err) {
            console.log(err.message)
            setText(false)

        }
    }

  return (
    <div>
        <MainLayout>
            <div className="w-full font-sansSerif">
                <div className='w-full mt-5'>
                    {
                        loading ? <Skeleton /> :  <div className="flex items-center  flex-wrap gap-7 w-[90%]  md:w-[95%] md:grid md:grid-cols-2 lg:w-full lg:grid-cols-3 xl:w-[95%] xl:grid-cols-4 mx-auto">
                        {
                            listings.map(listing => (
                                <ListingItem key={listing._id} listing={listing} loading={loading}/> 
                            ))
                        }        
                    </div>
                    }   
                </div>
            </div>
          {
            loadmore &&   <div className='flex flex-col items-center mt-5 mb-10'>
            <div className="flex flex-col items-center w-1/3 lg:w-1/4 bg-pink-800 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80 cursor-pointer">
                <button
                    onClick={showmore}
                > 
                    {
                        text ? <div className='flex justify-center items-center'>
                        <span className='mr-2'>Loading...</span>
                        <Circles
                            height="20"
                            width="20" 
                            color="#ffffff"
                            visible={true}
                        /> </div> : ' Load listings'
                    } 
                </button>
            </div>
        </div> 
        } 
        </MainLayout>
    </div>
  )
}

export default Home