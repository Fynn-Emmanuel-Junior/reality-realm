import MainLayout from "../../../components/layouts/MainLayout"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import ListingItem from "../../../components/pageComponents/Search/ListingItem"
import Footer from "../../../components/pageComponents/Footer"

const Home = () => {

    const [listings,setListings] = useState([])
    const [error,setError] = useState(false)
    
    useEffect(() => {
            const fetchlistings = async () => {
                try {
                    const res = await fetch('/api/listings/get')
                    const data = await res.json()

                    setListings(data)
                } catch(err) {
                    console.log(err.message)
                    setLoading(false)
                }
            }

            fetchlistings()
    },[])

  return (
    <div>
        <MainLayout>
            <div className="w-full">
                <div className='w-full mt-5'>
                    <div className="flex items-center  flex-wrap gap-3 w-[90%]  md:w-[95%] md:grid md:grid-cols-2 lg:w-full lg:grid-cols-3 xl:w-[90%] xl:grid-cols-4 mx-auto">
                        {
                            listings.map(listing => (
                                <ListingItem key={listing._id} listing={listing}/>
                            ))
                        }        
                    </div>   
                </div>
            </div>
        </MainLayout>
        <div className="my-10">
            <Footer />
        </div>
    </div>
  )
}

export default Home