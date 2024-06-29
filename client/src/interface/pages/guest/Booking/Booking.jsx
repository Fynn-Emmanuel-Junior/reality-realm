import React,{useState,useEffect} from 'react'
import { IoIosArrowBack,IoIosStar } from "react-icons/io";
import { useListing } from '../../../hooks/useListing';
import {useParams} from 'react-router-dom';

const Booking = () => {
    const {id} = useParams()
    const {GetListing} = useListing();
    const [listing,setListing] = useState();
    console.log(listing)

    useEffect(() => {
        const fetch = async() => {
            const data = await GetListing(id)
            setListing(data);
        }
        fetch();
    }, []);
  return (
    <div className='md:hidden'>
        <div>
            <div className='w-11/12 mx-auto'>
                <header className='flex items-center gap-20 mt-5 pb-5'>
                    <IoIosArrowBack size={20}/>
                    <p className='font-semibold'>Confirm and book appointment</p>
                </header>
            </div>
        </div>
        <hr />
        <div>
            <div className='w-11/12 mx-auto flex items-center gap-3'>
                <div className='w-36 h-32'>
                    <img src={listing.imageurls[0]} alt='profile_img' className='w-full h-full rounded-2xl'/>
                </div>
                <div>
                    <h3 className='font-semibold'>{listing.name}</h3>
                    <div>{listing.description}</div>
                    <div className='flex gap-1 items-center'>
                        <IoIosStar size={20}/>
                        <p>5.00(4)</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Booking