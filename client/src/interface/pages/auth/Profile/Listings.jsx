import React, {useState} from 'react'
import MainLayout from "../../../components/layouts/MainLayout"

const Listings = () => {
    const [files,setFiles] = useState([])
    console.log(files) 

    const handleImages =  (e) => {
        e.preventDefault()


    }

  return (
    <MainLayout>
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold my-7 text-center'> Create a listing </h1>
            <form className='flex flex-col sm:flex-row gap-6'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        id="name" 
                        className='border rounded-lg p-3 focus:outline-none'
                        minLength={10}
                        maxLength={62}
                        required
                    />
                     <input 
                        type="text" 
                        placeholder="Description"  
                        id="description" 
                        className='border rounded-lg p-3 focus:outline-none'
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Address"  
                        id="address"  
                        className='border rounded-lg p-3 focus:outline-none'
                        required
                    />
                    <div className='flex  gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sell' className='w-5'/>
                            <span> Sell </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5'/>
                            <span> Rent </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5'/>
                            <span> Parking Spot </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5'/>
                            <span> Furnished </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5'/>
                            <span> Offer </span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='bedrooms' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <span>Beds</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='bathrooms' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <span>Baths</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='regularPrice' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <div className='flex flex-col items-center'>
                                <p> Regular Price </p>
                                <span className='text-xs'> ($ / month) </span>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='discountPrice' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <div className='flex flex-col items-center'>
                                <p> Discount Price </p>
                                <span className='text-xs'> ($ / month) </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>  
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'> The first image will be the cover (max 6) </span>
                    </p>
                    <div  className='flex gap-4'>
                        <input 
                            type="file" 
                            id='images' 
                            accept='images/*'
                            multiple 
                            className='p-3 border border-gray-600 rounded w-full'
                            onChange={(e) => setFiles(e.target.files)}
                        /> 
                        <button 
                            type='button'
                            onClick={handleImages} 
                            className='p-3 text-green-600 border border-green-600 rounded hover:shadow-lg'
                        > 
                        Upload </button>
                    </div>
                    <button className='bg-slate-700 uppercase text-white p-3 rounded-lg hover:opacity-95'> create listing </button>
                </div>
            </form>
        </main>
    </MainLayout>
  )
}

export default Listings