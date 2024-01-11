import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import Carousel from '../../pageComponents/listing/Carousel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Card = ({listing}) => {
	const [loading,setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		},2000)
	})
  return (
    <div className='flex flex-col items-center '>
        <div  className='rounded-lg m-2 '>
			{
				loading ? (
					<div>
						<Skeleton width={800} height={700}/>
					</div>		
				) : (
					<Carousel images={listing.imageurls} id={listing._id}/>
				)
			}
        </div>
    </div>
  )
}

export default Card