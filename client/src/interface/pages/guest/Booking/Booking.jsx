import React,{useState,useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";
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
            <div className='w-11/12 mx-auto'>
                <div>
                    <img src={listing?.imageurls[0]} alt='profile_img' width={300} height={100}/>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Booking