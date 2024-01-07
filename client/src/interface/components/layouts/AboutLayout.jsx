import PropTypes from 'prop-types'
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useState } from 'react'
import Menu from '../pageComponents/Menu';

const MainLayout = ({children}) => {
	const [open,setOpen] = useState(false)
	
	const handleOpen = () => {
		setOpen(true)
	}

  return (
    <div className='font-sansSerif '>
        <header className='flex flex-col'>
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
					open && <Menu open={open} setOpen={setOpen} />
				}
			</>
			<div className='w-[95%] md:mx-auto absolute top-[4%] sm:top-[3%] md-x:top-[3%] lg:top-[5%] xl:top-[20%] left-[50%] -translate-x-2/4 -translate-y-2/4'>
				<div className='flex justify-between items-center'>
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