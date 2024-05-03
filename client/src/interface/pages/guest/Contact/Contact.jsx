import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import ContactLayout from '../../../components/layouts/ContactLayout'
import Footer from '../../../components/pageComponents/Footer'
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setMenu } from '../../../../logic/ReduxStore/features/menu/menuSlice';

const Contact = () => {
	const [open,setOpen] = useState(false)
	
	const handleOpen = () => {
		setOpen(true)
	}

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setMenu(true))
	},[])
  return (
    <ContactLayout>
		<div className='flex flex-col items-center'>
			<section className='flex flex-col lg:flex-row items-center gap-9 mt-20 '>
				<div className='bg-[#f2ecd977] shadow-lg p-6 flex flex-col gap-4 rounded-2xl w-[300px] sm:w-[484px] lg:w-[300px]'>
					<h3 className='text-slate-900 text-lg font-bold text-center'> Chat Support </h3>
					<p className='text-center'> Our support team is just a click away </p>
					<div className='flex flex-col items-center'>
						<div className='flex items-center gap-4 text-blue-900'>
							<button> Chat now </button>
							<FaArrowRightLong />
						</div>
					</div>
				</div>	
				<div className='bg-[#f2ecd977] shadow-lg p-6 flex flex-col gap-4 rounded-2xl w-[300px] sm:w-[484px] lg:w-[300px]'>
					<h3 className='text-slate-900 text-lg font-bold text-center'> Email Support </h3>
					<p className='text-center'> Prefer to email? Send us an email and we'll get back to you soon </p>
					<div className='flex flex-col items-center'>
						<div className='flex items-center gap-4 text-blue-900'>
							<Link href='mailto:fynn.emmanuel100@gmail.com'> Send Email </Link>
							<FaArrowRightLong />
						</div>
					</div>
				</div>
				<div className='bg-[#f2ecd977] shadow-lg p-6 flex flex-col gap-4 rounded-2xl w-[300px] sm:w-[484px] lg:w-[300px]'>
					<h3 className='text-slate-900 text-lg font-bold text-center'> Help Center </h3>
					<p className='text-center'> Our self-serve help center is open 24/7 with 150+ articles to help </p>
					<div className='flex flex-col items-center'>
						<div className='flex items-center gap-4 text-blue-900'>
							<button> Visit help center </button>
							<FaArrowRightLong />
						</div>
					</div>
				</div>
			</section>
		</div>
		<div className='mt-20'>
			<Footer />
		</div>
    </ContactLayout>
  )
}

export default Contact