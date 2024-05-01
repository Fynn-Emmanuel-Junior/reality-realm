import React, { useState,useEffect } from 'react'
import MainLayout from '../../../components/layouts/MainLayout'
import CustomButton from '../../../components/customs/CustomButton'
import {useNavigate} from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import ListingItem from '../../../components/pageComponents/Search/ListingItem'
import SearchNavBar from '../../../components/pageComponents/Search/SearchNavBar'
import Navbar from '../../../components/pageComponents/smallScreens/Navbar'
import Footer from '../../../components/pageComponents/Footer'

const uri = 'https://reality-realm-server.onrender.com'

const Search = () => {
    const navigate = useNavigate()

    const [sidebarParams,setSidebarParams] = useState({
        searchTerm: '',
        typeOfPlace: 'all',
        offer: false,
        furnished: false,
        parking: false,
        sort: 'createdAt',
        order: 'desc'
    })

    const [loading,setLoading] = useState(false)
    const [listings,setListings] = useState([])
    const [showMore,setShowMore] = useState(false)

    useEffect(() => {
        const urlparams = new URLSearchParams(window.location.search)
        const searchTermUrl = urlparams.get('searchTerm')
        const typeUrl = urlparams.get('typeOfPlace')
        const offerUrl = urlparams.get('offer')
        const furnishedUrl = urlparams.get('furnished')
        const parkingUrl = urlparams.get('parking')
        const sortUrl = urlparams.get('sort')
        const orderUrl = urlparams.get('order')

        if (
            searchTermUrl ||
            typeUrl || 
            offerUrl ||
            furnishedUrl ||
            parkingUrl ||
            sortUrl ||
            orderUrl
        ) {
            setSidebarParams({
                searchTerm: searchTermUrl || '',
                typeOfPlace: typeUrl || 'all',
                parking: parkingUrl === 'true' ? true : false,
                furnished: furnishedUrl === 'true' ? true : false,
                offer: offerUrl === 'true' ? true : false,
                sort: sortUrl || 'createdAt',
                order: orderUrl || 'desc',
            })
        }

        const fetchListings = async () => {
            setLoading(true)

            const searchQuery = urlparams.toString()
        
            try {
                const res = await fetch(`http://localhost:3500/listings/get?${searchQuery}`)
                const data = await res.json()

                if(data.length > 8) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
                
                setListings(data)
                setLoading(false)
                
            } catch(err) {
                setLoading(false)
                console.log(`something went wrong\n${err.message}`)
            }
        }

        fetchListings()

    },[location.search])

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell') {
            setSidebarParams({...sidebarParams,typeOfPlace: e.target.id})
        }

        if(e.target.id === 'searchTerm') {
            setSidebarParams({...sidebarParams,searchTerm: e.target.value})
        }  

        if(e.target.id ===  'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebarParams({
                ...sidebarParams,
                [e.target.id] : e.target.checked  || e.target.checked === 'true' ? true : false
            })
        } 

        if(e.target.id === 'sort_order') {

            const sort = e.target.value.split('_')[0] || 'createdAt'
            const order = e.target.value.split('_')[1] || 'desc'

            setSidebarParams({...sidebarParams,sort,order})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlparams = new URLSearchParams()

        urlparams.set('searchTerm',sidebarParams.searchTerm)
        urlparams.set('typeOfPlace',sidebarParams.typeOfPlace)
        urlparams.set('offer',sidebarParams.offer)
        urlparams.set('furnished',sidebarParams.furnished)
        urlparams.set('parking',sidebarParams.parking)
        urlparams.set('sort',sidebarParams.sort)
        urlparams.set('order',sidebarParams.order)

        const searchquery = urlparams.toString()
        navigate(`/search?${searchquery}`)

    }

    const onShowMoreClick = async () => {
        const numoflistings = listings.length
        const startIndex = numoflistings
        const urlparams = new URLSearchParams(window.location.search)
        urlparams.set('startIndex',startIndex)

        const searchquery = urlparams.toString()

        const res = await fetch(`http://localhost:3500/listings/get/?${searchquery}`)
        const data = await res.json()

        if(data.length < 9) {
            setShowMore(false)
        }

        setListings([...listings,...data])

    }

  return (
    <>
        <Navbar />
        <SearchNavBar />
        <main className='flex flex-col lg:flex-row border'>
            <aside className='p-7 border-b-2 lg:border-r-2  md:border-b-0 w-auto sticky top-0  lg:top-[80px] lg:fixed z-30 lg:z-0 bg-white lg:max-w-[50%]'>
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        {/* <label htmlFor="searchTerm" className='whitespace-nowrap font-semibold'>Search Term: </label> */}
                            <input 
                                type="text"
                                name="searchTerm" 
                                id="searchTerm"  
                                className='border border-slate-700 rounded-lg p-3 w-full focus:outline-none focus:border-slate-800'
                                placeholder='Search...'
                                value={sidebarParams.searchTerm}
                                onChange={handleChange}
                            />
                    </div>
                    <div className='flex flex-col md:flex-row lg:flex-col gap-8 text-sm mt-5'>
                        <div className='flex gap-2 items-center flex-wrap'>
                            <label className='font-semibold'>Type:</label>
                            <div className='flex gap-2'>
                                <input
                                    type="checkbox"  
                                    id='all' 
                                    className='w-5' 
                                    onChange={handleChange}
                                    checked={sidebarParams.typeOfPlace === 'all'}
                                /> 
                                <span>Rent & Sale</span>
                            </div>
                            <div className='flex gap-2'>
                                <input 
                                    type="checkbox"  
                                    id='rent' 
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebarParams.typeOfPlace === 'rent'}
                                /> 
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2'>
                                <input 
                                    type="checkbox"  
                                    id='sell' 
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebarParams.typeOfPlace === 'sell'}
                                /> 
                                <span>Sale</span>
                            </div>
                            <div className='flex gap-2'>
                                <input 
                                    type="checkbox"  
                                    id='offer' 
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebarParams.offer}
                                /> 
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center flex-wrap'>
                            <label htmlFor="type" className='font-semibold'>Amenities:</label>
                            <div className='flex gap-2'>
                                <input 
                                    type="checkbox"  
                                    id='parking' 
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebarParams.parking}
                                /> 
                                <span>Parking</span>
                            </div>
                            <div className='flex gap-2'>
                                <input 
                                    type="checkbox"  
                                    id='furnished' 
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={sidebarParams.furnished}
                                /> 
                                <span>Furnished</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-3  mt-5'>
                        <label htmlFor="sort_order" className='font-semibold'>Sort:</label>
                        <select 
                            id="sort_order"
                            className='border rounded-lg p-3 focus:outline-none w-full'
                            onChange={handleChange}
                            defaultValue={'createdAt_desc'}
                        >
                            <option value="regularPrice_desc">high to low</option>
                            <option value="regularPrice_asc">low to high</option>
                            <option value="createdAt_desc">latest</option>
                            <option value="createdAt_asc">oldest</option>
                        </select>
                    </div>
                    <div className='w-full mt-5'>
                        <button className='bg-slate-700 text-white text-base  rounded-lg hover:opacity-95 p-3 w-full'>
                            Search
                        </button> 
                    </div> 
                </form>
            </aside>
            <section className='lg:w-[70%] xl:w-4/5 lg:ml-[40%] xl:ml-[30%] lg:flex lg:flex-col lg:self-end'>
                <h1 className='font-semibold text-xs p-3 mt-5 text-slate-700'> Listing results: </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {
                         !loading && listings.length == 0 && (
                            <p className='text-xl text-slate-700 text-center'> No listings found!</p>
                        )
                    }
                    {/* {
                        loading && 
                        <div className='flex justify-center w-full gap-3'> 
                            <Circles 
                                height="30"
                                width="30"
                                color="#252B48"
                                ariaLabel="circles-loading"
                                visible={true}
                            />
                            <span className='text-slate-700 text-xl'> Loading...</span>
                        </div>
                    } */}
                    <div className="flex items-center flex-wrap gap-3 w-[90%]  md:w-[95%] md:grid md:grid-cols-2 lg:w-full lg:grid-cols-2  xl:grid-cols-3 mx-auto">
                        {
                            listings && listings.map(listing => <ListingItem key={listing._id} listing={listing}/>)
                        }
                    </div>
                    
                        {
                            showMore && (
                                <button 
                                    onClick={onShowMoreClick}
                                    className='text-slate-900 underline p-7 text-center w-full font-semibold'
                                >
                                    Show more
                                </button>
                            )
                        }
                    
                </div>
            </section>
        </main>
       <Footer />
           
    </> 
  )
}

export default Search