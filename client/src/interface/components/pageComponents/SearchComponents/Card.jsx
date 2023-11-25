import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import { FaBath, FaBed } from 'react-icons/fa'

const Card = ({listing}) => {
  return (
    <div className='overflow-hidden rounded-lg w-full m-2 sm:w-[310px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageurls[0]} alt="listing cover"  className='h-[300px] sm:h-[280px] w-full object-cover rounded-xl'/> 
            <div className='p-3 flex flex-col gap-1 w-full'>
                <p className='truncate text-base font-semibold text-slate-900'>{listing.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='truncate text-sm'>{listing.address}</p>
                </div>
                {/* <p className='text-sm text-gray-600 truncate overflow-x-hidden'>{listing.description}</p> */}
				<p className='text-slate-900 text-sm font-semibold'> 
					$
					{
						listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')
					}
					{
						listing.typeOfPlace === 'rent' && '/month'
					}		
				</p>
				{/* <div className='text-sm font-semibold flex gap-4 sm:gap-6 flex-wrap'>
					<div className='flex items-center gap-2 text-gray-700 text-sm font-semibold'> 
						<FaBed className='text-lg'/>
						{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }
					</div>
					<div className='flex items-center gap-2 text-gray-700 text-sm font-semibold'> 
						<FaBath className='text-lg'/>
						{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bedrooms} bath` }
					</div>
				</div> */}
            </div>
        </Link>
    </div>
  )
}

export default Card