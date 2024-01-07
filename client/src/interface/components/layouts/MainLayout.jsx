import PropTypes from 'prop-types'
import Header from '../pageComponents/Header';
import bg from '../../assets/bg3 (1).jpg'
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { useState } from 'react'
import Menu from '../pageComponents/Menu';
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../logic/ReduxStore/features/users/usersSlice';
import profile from '../../assets/profile.png'


const MainLayout = ({children}) => {
	const user = useSelector(selectCurrentUser)
	const [open,setOpen] = useState(false)
	
	const handleOpen = () => {
		setOpen(true)
	}

  return (
    <div className='font-sansSerif '>
        <header className='flex flex-col'>
			<div className='w-full xxs:h-[170px] sm:h-[250px] md:h-[430px]'>
				<img src={bg} alt="bg-cover"  className='w-full h-full object-cover'/>
			</div>
			<div className='bg-black w-full xxs:h-[170px] sm:h-[250px] md:h-[430px] absolute top-0 left-0 opacity-50'>
			</div>
			<div className='hidden z-20 lg:inline bg-white text-black absolute top-0 left-0 w-full'>
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
						<p className='hidden lg:inline text-3xl font-bold text-slate-800 cursor-pointer'>RealityRealm</p>
					</Link>
					<div className='hidden lg:inline  text-base'>
						<div className='flex gap-3 justify-between items-center'>
							<Link to='/about'>
								About
							</Link>
							<Link to='/signin'>
								{
									user ? '' : 'Sign in'
								}
							</Link>
							<Link to='/profile'>
								{
									user ? <img src={profile} alt='profile_img' width={50} height={50}/> : 'Profile'
								}
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
			<div className='w-[95%] md:mx-auto absolute top-[9%] xs:top-[10.5%] sm:top-[14%] md:top-[15%] md-x:top-[13%] lg:top-[5%] xl:top-[20%] left-[50%] -translate-x-2/4 -translate-y-2/4'>
				<div className=' text-white flex justify-between items-center'>
					<div className='lg:hidden lg:text-3xl  xxs:text-base sm:text-xl md:text-2xl'>
						<HiOutlineMenu onClick={handleOpen}/>
					</div>
					<p className='lg:hidden text-sm sm:text-lg font-bold md:text-2xl'>
						<Link to='/'>
							RealityRealm
						</Link>
					</p>
					<div className='lg:hidden text-[10px] sm:text-sm uppercase md:text-lg'>
						<Link to='/profile'>
							{
								user ? <img src={profile} alt='profile_img' width={50} height={50}/> : 'Profile'
							}
						</Link>
					</div>
				</div>
				<div className='w-full xxs:mt-[5%] xs:mb-[8%] md:mt-[10%] lg:mt-[45%] xl:mt-[13%]'>
					<div className='md-x:mb-3'>
						<h1 className="text-white font-medium xxs:text-xs xs:text-base md:text-2xl text-center">
							Find your next perfect place with ease
						</h1>
					</div>
					<div className='flex mt-2  bg-white w-5/6 lg:w-4/6 xl:w-3/6 justify-between items-center p-2 xs:p-3 mx-auto'>
						<input 
							type="text" 
							name="searchTerm" 
							id="searchTerm"
							placeholder='Search here...' 
							className='focus:outline-none w-full text-xs sm:text-sm md:text-base md:p-2'
						/>
						<CiSearch className='lg:text-2xl'/>
					</div>
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