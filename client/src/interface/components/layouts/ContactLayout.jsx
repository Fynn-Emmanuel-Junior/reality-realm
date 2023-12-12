import PropTypes from 'prop-types'
import Header from '../pageComponents/Header';
import bg from '../../assets/bg3 (2).jpg'
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { useState } from 'react'
import Menu from '../pageComponents/Menu';
import AccountLayout from '../pageComponents/AccountLayout'

const MainLayout = ({children}) => {
	const [open,setOpen] = useState(false)
	
	const handleOpen = () => {
		setOpen(true)
	}

  return (
    <div className='font-sansSerif '>
        <header className='flex flex-col'>
			<div className='w-full xxs:h-[200px] sm:h-[250px] md:h-[350px]'>
				<img src={bg} alt="bg-cover"  className='w-full h-full object-cover'/>
			</div>
			<div className='bg-black w-full xxs:h-[200px] sm:h-[250px] md:h-[350px] absolute top-0 left-0 opacity-70'>
			</div>
			<div className='hidden z-20 lg:inline text-white absolute top-0 left-0 w-full'>
				<div className='flex justify-between items-center px-3 py-5 lg:w-[98%] xl:w-[95%] 2xl:w-10/12 mx-auto'>
					<div className='flex gap-3 justify-between items-center xl:p-2  text-base'>
						<div className='cursor-pointer'>
							<Link to='/search'>
								Buy
							</Link>	
						</div>
						<div className='cursor-pointer'>
							<Link to='/search'>
								Sell
							</Link>	
						</div>
						<div className='cursor-pointer'>
							<Link to='/contact'>
								Contact us
							</Link>	
						</div>
					</div>
					<Link to='/'>
						<p className='hidden lg:inline text-3xl font-bold text-white cursor-pointer'>RealityRealm</p>
					</Link>
					<div className='hidden lg:inline  text-base'>
						<div className='flex gap-3 justify-between items-center'>
							<Link to='/about'>
								About
							</Link>
							<Link to='/signin'>
								Sign in
							</Link>
							<Link to='/profile'>
								Profile
							</Link>
						</div>
					</div>
				</div>
			</div>
			<>
				{
					open && <Menu open={open} setOpen={setOpen}/>
				}
			</>
			<div className='w-[95%] md:mx-auto absolute top-[14%] xs:top-[10.5%] sm:top-[18%] md:top-[15%] md-x:top-[13%] lg:top-[5%] xl:top-[20%] left-[50%] -translate-x-2/4 -translate-y-2/4'>
				<div className=' text-white flex justify-between items-center'>
					<div className='lg:hidden lg:text-3xl  xxs:text-base sm:text-xl md:text-2xl'>
						<HiOutlineMenu onClick={handleOpen}/>
					</div>
					<p className='lg:hidden text-sm sm:text-lg font-bold md:text-2xl'>RealityRealm</p>
					<div className='lg:hidden text-[10px] sm:text-sm uppercase md:text-lg'>
						<Link to='/signin'>
							sign in
						</Link>
					</div>
				</div>
				<div className='flex flex-col items-center w-full xxs:mt-[10%] xs:mb-[8%] md:mt-[10%] lg:mt-[45%] xl:mt-[13%] text-white'>
					<p className='text-2xl xs:text-3xl md:text-4xl font-semibold text-center'> Get in touch with us for  more information </p>
                    <p className='mt-2 sm:mt-4 text-sm xs:text-base text-center'> if you need help or have a question , we're here for you </p>
				</div>
			</div>
		</header>
        <div>
            {children}
        </div>
    </div>
  )
}

MainLayout.propTypes = {
    children: PropTypes.node,
  };

export default MainLayout