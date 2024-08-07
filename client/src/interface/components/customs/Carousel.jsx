import {useState} from 'react'
import { FiChevronLeft,FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import PropTypes from 'prop-types';

const Carousel = ({images,id}) => {
    const [current,setCurrent] = useState(0)
    const [ishovered,setIsHovered] = useState(false)
    const [arrowright,setArrowRight] = useState(false)

    const handleMouseOver = async () => {
        setIsHovered(true)
        setArrowRight(true)
    }

    const handleMouseOut = async () => {
        setIsHovered(false)
        setArrowRight(false)
    }

    const prev = async () =>  {
        if(current === 0 ) {
            setCurrent(images.length - 1)
            setArrowRight(false)
        } else {
            setCurrent(current - 1)
            setArrowRight(true)  
        }
    }
    // setCurrent( current => current === 0 ? images.length -1 : current -1 )
    const next = async () => {
        if(current === images.length - 1) {
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        }
        // setCurrent( current => current ===  images.length -1  ? 0 : current +1 )  
    }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  className='overflow-hidden relative'>
        <Link to={`/listing/${id}`} className='relative flex transition-transform ease-out duration-500' style= {{transform: `translateX(-${current*100}%)`}}>
            {
                images.map((image,index) => (
                    <img key={index} src={image} alt='listing-images' className='w-screen md:w-content xxs:h-[220px] xs:h-[290px] sm:h-[467px] md:h-[315px] lg:h-[278px] xl:h-[267px] 2xl:h-[300px] object-full rounded-xl'/>
                    ))
            }
        </Link>
        {
            arrowright && <button onClick={prev} className='bg-gray-200 text-center hover:bg-white p-1 rounded-full text-gray-700 hover:shadow-2xl absolute top-[45%] left-2'>
            <FiChevronLeft size={20}/>
            </button>
        }
        <>
            {
                ishovered && <button onClick={next} className='bg-gray-200 text-center hover:bg-white p-1 rounded-full text-gray-700 hover:shadow-2xl absolute right-2 top-[45%]'>
                    <FiChevronRight size={20}/>
                </button>
            }
        </>           
        <div className='absolute bottom-4 right-0 left-0'>
            <div className='flex justify-center items-center gap-2'>
                {
                    images.map((_,i) => (
                        <div key={i} className={`transition-all w-2 h-2 bg-white rounded-full ${current == i ? 'p-1' : 'bg-opacity-60'}`} />
                    ))
                }
            </div>
        </div>	  
    </div>
  );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number.isRequired,
};

export default Carousel