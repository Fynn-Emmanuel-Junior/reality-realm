import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useState } from 'react'
import Menu from '../pageComponents/Menu';
import { selectCurrentUser } from '../../../logic/ReduxStore/features/users/usersSlice';
import { useSelector } from 'react-redux'
import profile from '../../assets/profile.png'
import Footer from '../pageComponents/Footer';

const MainLayout = ({children}) => {
	const user = useSelector(selectCurrentUser)

	const [open,setOpen] = useState(false)

	const [isSticky, setIsSticky] = useState(false);
	
	const handleOpen = () => {
		setOpen(true)
	}

	useEffect(() => {
		const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 200) { // Adjust the value according to your needs
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
		};
	
		window.addEventListener('scroll', handleScroll);
	
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [])

  return (
    <div className='font-sansSerif'>
        <header className='flex flex-col'>
			<div className={`bg-[#EAEAEA] hidden z-20 lg:inline text-black ${isSticky ? 'fixed top-0 left-0 transition duration-1000 ease-in-out' : 'absolute top-0 left-0 '} w-full`}>
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
							{
								user ?  '' : <Link to='/signin'>
								Sign in
							</Link>
							}
							
							<Link to='/profile'>
								{ user  ? <img src={profile} alt='profile_img' width={50} height={50} /> : 'profile'}
							</Link>
						</div>
					</div>
				</div>
			</div>
			<>
				{
					open && <Menu open={open} setOpen={setOpen} />
				}
			</>
			<div className='w-[95%] md:mx-auto absolute top-[4%] sm:top-[3%] md-x:top-[3%] lg:top-[5%] xl:top-[20%] left-[50%] -translate-x-2/4 -translate-y-2/4'>
				<div className='flex justify-between items-center'>
					<div className='lg:hidden lg:text-3xl  xxs:text-base sm:text-xl md:text-2xl'>
						<HiOutlineMenu onClick={handleOpen}/>
					</div>
					<p className='lg:hidden text-sm sm:text-lg font-bold md:text-2xl'> RealityRealm </p>
					<div className='lg:hidden text-[10px] sm:text-sm uppercase md:text-lg'>
						<Link to='/signin'>
							{ user  ? <img src={profile} alt='profile_img' width={50} height={50} /> : 'Signin'}
						</Link>
					</div>
				</div>
			</div>
		</header>
        <div className='mt-20 xl:mt-40'>
            {children}
        </div>
		
    </div>
  )
}

MainLayout.propTypes = {
    children: PropTypes.node,
  };

export default MainLayout