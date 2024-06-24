import { FaFacebookF, FaTwitter, FaLinkedinIn,FaYoutube } from "react-icons/fa"
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
	<footer className='bg-[#EAEAEA] w-full flex flex-col border-t-2 pb-5'>
		<div className='w-11/12 mx-auto flex flex-col lg:w-4/6 lg:ml-10 lg:mx-0 lg:flex-row lg:justify-between gap-4'>
			<div className="border-b-[0.5px] lg:border-b-0 pb-5 border-gray-400">
				<h3 className='font-medium text-base my-3'>Support</h3>
				<div className="flex flex-col gap-2">
					<p>Help Center</p>
					<p>Get help with safety issue</p>
					<p>Anti-discrimination</p>
					<p>Disability support</p>
					<p>Report neighborhood concern</p>
				</div>
			</div>
			<div className="border-b-[0.5px] lg:border-b-0 pb-5 border-gray-400">
				<h3 className='font-medium text-base my-3'>Hosting</h3>
				<div className="flex flex-col gap-2">
					<p>Host your home</p>
					<p>Hosting resources</p>
					<p>Community forum</p>
					<p>Hosting responsibly</p>
					<p>Join a free hosting class</p>
				</div>
			</div>
			<div className="border-b-[0.5px] lg:border-b-0 pb-5 border-gray-400">
				<h3 className='font-medium text-base my-3'>Reality Realm</h3>
				<div className="flex flex-col gap-2">
					<p>Newsroom</p>
					<p>New features</p>
					<p>Careers</p>
					<p>Invetsors</p>
					<p>Gift Cards</p>
				</div>
			</div>
		</div>
		<div className='w-11/12 mx-auto mt-5  flex flex-col lg:flex-row lg:justify-between lg:mt-0'>
				<div className='flex items-center gap-5'>
					<div className='flex items-center gap-3'>
						<TbWorld size={25}/>
						<span className='text-lg font-medium'>English(US)</span>
					</div>
					<div className='font-medium'>$ {" "}USD</div>
				</div>
				<div className='mt-3'>
					<ul className='flex gap-3 items-center'>
						<p>&copy; Reality Realm</p>
						<li className='flex items-center gap-2'>Terms <div className="bg-black w-1 h-1 rounded-full"/></li>
						<li className='flex items-center gap-2'>SiteMap <div className="bg-black w-1 h-1 rounded-full"/></li>
						<li>Privacy</li>
					</ul>

				</div>
			</div>
	</footer>
  )
}

export default Footer