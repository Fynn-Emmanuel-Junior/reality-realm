import React from 'react'
import MainLayout from '../../../components/layouts/MainLayout'
import CustomButton from '../../../components/customs/CustomButton'

const SearchPage = () => {
  return (
    <MainLayout>
        <main className='flex flex-col md:flex-row'>
            <aside className='p-7 border-b-2 md:min-h-screen md:border-b-0 md:border-r-2'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="searchTerm" className='whitespace-nowrap font-semibold'>Search Term: </label>
                        <input 
                            type="text"
                            name="searchTerm" 
                            id="serachTerm"  
                            className='border rounded-lg p-3 w-full focus:outline-none'
                            placeholder='Search...'
                        />
                    </div>
                    <div className='flex gap-2 items-center flex-wrap'>
                        <label htmlFor="type" className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox"  id='all' className='w-5'/> 
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox"  id='rent' className='w-5'/> 
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox"  id='sell' className='w-5'/> 
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox"  id='offer' className='w-5'/> 
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center flex-wrap'>
                        <label htmlFor="type" className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox"  id='parking' className='w-5'/> 
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox"  id='furnished' className='w-5'/> 
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="Sort" className='font-semibold'>Sort:</label>
                        <select id="sort_order" className='border rounded-lg p-3 focus:outline-none w-full'>
                            <option value="">high to low</option>
                            <option value="">low to high</option>
                            <option value="">latest</option>
                            <option value="">oldest</option>
                        </select>
                    </div> 
                    <CustomButton text={'Search'}/>  
                </form>
            </aside>
            <section>
                <h1 className='text-2xl font-semibold border-b p-3 mt-5 text-slate-700'> Listing results: </h1>
            </section>
        </main>
    </MainLayout>
  )
}

export default SearchPage