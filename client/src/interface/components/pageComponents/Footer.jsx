import { FaFacebookF, FaTwitter, FaLinkedinIn,FaYoutube } from "react-icons/fa"

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
			<div>
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
	</footer>
  )
}

export default Footer