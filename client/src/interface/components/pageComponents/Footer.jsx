import { FaFacebookF, FaTwitter, FaLinkedinIn,FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
	<footer className='bg-[#EAEAEA] flex flex-col gap-4 items-center border-t-2 pb-5 text-center'>
		<div className='flex items-center gap-3 mt-5'>
			<div className='bg-zinc-500 p-2 w-8 rounded-lg cursor-pointer'>
				<FaFacebookF  className='text-sm'/>
			</div>
			<div className='bg-zinc-500 p-2 w-8 rounded-lg cursor-pointer'>
				<FaTwitter className='text-sm'/>
			</div>
			<div className='bg-zinc-500 p-2 w-8 rounded-lg cursor-pointer'>
				<FaLinkedinIn className='text-sm'/>
			</div>
			<div className='bg-zinc-500 p-2 w-8 rounded-lg cursor-pointer'>
				<FaYoutube className='text-sm'/>
			</div>
		</div>
		<p> Copyright &copy; All rights reserved | <span className='text-slate-800 text-lg font-semibold'>Reality-Realm</span> </p>
		<p> Terms & Conditions / Privacy Policy </p>
	</footer>
  )
}

export default Footer