import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

const Booking = () => {
  return (
    <div className='w-11/12 mx-auto md:hidden'>
        <header className='flex items-center gap-10 mt-5'>
            <IoIosArrowBack size={20}/>
            <p>Confirm and Book Appointment</p>
        </header>
    </div>
  )
}

export default Booking