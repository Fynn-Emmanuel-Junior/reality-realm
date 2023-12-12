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
    <nav className='lg:hidden text-black flex justify-between mt-2 w-11/12 mx-auto'> 
        <>
			{
				open && <Menu open={open} setOpen={setOpen}/>
			}
		</>
        <div>
            <HiOutlineMenu className=" text-xl sm:text-3xl md:text-5xl lg:hidden" onClick={handleOpen}/>
        </div>
        <div>
            <Link to='/signin' className='font-semibold'> Signin </Link>
        </div>
    </nav>
  )
}

export default Navbar