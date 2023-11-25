import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import { FaBath, FaBed } from 'react-icons/fa'

const Card = ({listing}) => {
  return (
    <div className='overflow-hidden rounded-lg w-full m-2 sm:w-[310px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageurls[0] || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAAAYFBMVEX///8AAADl5eWPj49XV1fw8PDi4uLGxsaqqqo5OTmEhIRvb2/T09OYmJgxMTH5+fkpKSnMzMy6urogICBHR0fa2to+Pj4UFBRQUFAODg6ioqIZGRlpaWldXV18fHy0tLSmTBjKAAAFM0lEQVRoge2b2ZqCOBCFBQygLBFQQW30/d9yTGWBFGHTRL+Z8dx00yw/SVXqhEBvNj/9a0R8n4zvQrIJTpPc8/IkNe2LDx7W9mSNHMhrBgbyAPzUxVLD6ba7ZkPxXhPZ8/ZWyCfo0Nv9fmM/D6gvyfNv5yzQxLrcBrm8MOL92Vp6h74sB+gEnWIJfYX+ywwbjtG8obVqaHmTXeAaTRpGynvhPeWQbN0Qd4ROIcxbLalpCwFXI9wNOjYPZT7IY5foPSAewx0P2HF3hiZ/MIoLuR0mSSh/L2Ck/xE36PDMrn7saJXnVd19HNnec+gCXdTQLpVgvI+73qfQJ3VkH40TzGAfGWxfbaMTuGwkN7l9VJU+0iI4KKE20QQCeVBh5vbRELLV7SOE6nK2iOakVtWrsh6zD9KKMFhCl9xuVb9O2Qfd20TL7JEXx/ahuqB/L60NNIwZT41fbh/92QEPx1GFo4AT/t5GE0icg5pXpTc9qZl4utfKPny4l1ybra5HixagOjJjH4OeegWN68iMfXQTP3wvq9GIhO2jr759MJXoXtaheb24qRAK+xiZTvudfYBEUsh7WYUOoR3nLnEvetixuH1cVK3VK+AadIEqw9WcYH0FegEQdb9Yi86Ml4kmztgo+0C3m61DIxLvvDycOoWJ20dXXSIIUkKXo31E4tPd7dgTbU/cPnpWthOpuRCdIhvmA+U+mmB9CftQFZ5PlA/pMjQekjjsM8JPQsLKlqCz2aI4I2wf8VI0fpKAMOerHssJsg/+xDLwUSRcR1Jvuo6YRbHRovmVSWIwqO2R55x5YftI9Eo3lDlDDEY1L2xl07nKx8WlMyoIe21cIpoXt49uKvmADt0bQ8eNKu/mGpBguwV1xCxy1utSOlqXwkqvgcYZ1joZk60arJ9pT6kbGfbFdcQsfBFj7qzOyGWaHzEESJUiYft4XcLKVEWKIKyJCisv8d2Dcwp1Zbuyjpgl7UPdC7SqldcOta2Bfbwpo5XJZlJmqmeJxvbxtmKtUFHW7J1qJzT72Lupywqjmhe3D9GtTb/RG+ESLBHFA7LVhXOtukBCawUy5kkf1fpgsCYg1hEfxCiY8OQqJhT2yXKJfK/XLaHe2ro7NAzawT4+HXGPzk3+wfKwPbpDH9nguRhLZMrqSOsO3bLqMuL+lPCQO0I/g0ymirOGJhParDvKmF/j6P1uQmoGl00dpZxgHbrwJiVaRKaPkrFdh46mLypSNZw+Ss4B1qN37dagNtfRuTyqfQ7Qizpq9xZ6ZA6+19Gdtz/v6aA2Hm+hR2x7GTr+oX9o9+hPZHhzzbiuzxn+LZP6+wDaSTX7ocfRySnlYq9BDmoj+F8Orh/6h7aJvlMx96UMLSfC9PrfLilfQtNptHy6c4HeFMmE1FLc84TGOnqZDvPL6q7QJJhdDnOFXiDL6FMZx49i2ZKnVXR55O968v2SBX2LaPWNitf/oOMTaL/SBvj8qr41NAVylZVRzFs/++LIGjrpNZV/ajC38GoJXQT9Ar7ZMHZTTiebFXQBS/398sVXXOps4eLVy+iryKw+587/NPX63QJakGstp/0drHf3XqQ5QMOyfhWfMMOP4JXb+GL722h4t3E0xzTWc882mi30HcayafIz8bfRLJ/Gq+Yz4LexaL+NbroLjJyovU2ioRR8Q8d/9dl6ROaHBhHWtMi463RmH8aZ9sA1WfbHfqgCQhPvw0ok2/80uavnX0Y3wcfUIPQLH4C8quCH/m6sv5jhX0LLKcTn1HuPPPh3N8f6SDr/hPQPKmxOsFGPVuEAAAAASUVORK5CYII='} alt="listing cover"  className='h-[300px] sm:h-[280px] w-full object-cover rounded-xl'/> 
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