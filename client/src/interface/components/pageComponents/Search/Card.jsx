import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import Carousel from '../../customs/Carousel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { TailSpin } from 'react-loader-spinner'


const Card = ({listing,loading}) => {
	// const [loading,setLoading] = useState(true)

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setLoading(false)
	// 	},2000)
	// })
  return (
    <div className='flex flex-col items-center '>
        <div  className='rounded-lg m-2 '>
			{
				<Carousel images={listing.imageurls} id={listing._id}/>
			}
			
            <div className='flex flex-col w-full text-xs xs:text-sm sm:text-base'>
						<>
							{
								!loading && <p className='truncate font-semibold text-sm text-slate-900 mt-2'>{listing.name}</p>
						
							}
						</>
					
						<>
							{
								!loading && 
									<div className='flex items-center'>
										<MdLocationOn className='h-4 w-4 text-green-700'/>
										<p className='truncate text-sm'>{listing.address}</p>
                					</div>
								
							}
						</>
						<>
							{
								!loading &&
									<p className='text-slate-900 text-sm  font-semibold'> 
										$
										{
											listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')
										}
										{
											listing.typeOfPlace === 'rent' && '/month'
										}		
									</p>
								
							}
						</>
            </div>
        </div>
    </div>
  )
}

export default Card