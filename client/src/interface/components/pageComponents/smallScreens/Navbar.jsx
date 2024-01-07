import React,{useState} from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Menu from '../../pageComponents/Menu'

const Navbar = () => {
    const [open,setOpen] = useState(false)
	
	const handleOpen = () => {
		setOpen(true)
	}
  return (
    <nav className='lg:hidden text-black flex justify-between items-center pt-2 w-11/12 mx-auto pb-2 bg-white z-30 sticky top-0'> 
        <>
			{
				open && <Menu open={open} setOpen={setOpen}/>
			}
		</>
        <div>
            <HiOutlineMenu className=" text-xl sm:text-3xl md:text-5xl lg:hidden" onClick={handleOpen}/>
        </div>
        <div>
            <Link to='/signin' className='font-semibold md:text-2xl md-x:text-3xl'> Signin </Link>
        </div>
    </nav>
  )
}

export default Navbar