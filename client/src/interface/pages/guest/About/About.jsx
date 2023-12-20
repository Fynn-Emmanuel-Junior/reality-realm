import AboutLayout from '../../../components/layouts/AboutLayout'
import Footer from '../../../components/pageComponents/Footer'
import bg from '../../../assets/bg3 (1).jpg'


const About = () => {
  return (
    <AboutLayout>
		<section className='flex flex-col lg:flex-row lg:justify-between items-center w-screen xl:w-11/12'>
			<div className='w-3/6 h-auto'>
				<img 
					src={bg} 
					alt="cover-image" 
					className='w-full object-cover'
				/>
			</div>
			<div className='w-[45%]'>
				<h1 className="text-3xl font-bold mb-4 text-slate-800">About Reality Realm</h1>
				<p className="text-slate-700 mb-4">
					Reality Realm is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
				</p>
			</div>
		</section>
		<div className='flex flex-col items-end mt-20'>
			<section className='flex justify-between items-center w-screen xl:w-11/12'>
				<div className='w-[45%]'>
					<h1 className="text-3xl font-bold mb-4 text-slate-800"> Our mission </h1>
					<p className="text-slate-700 mb-4">
					Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
				</p>
				</div>
				<div className='w-3/6 h-auto'>
					<img 
						src={bg} 
						alt="cover-image" 
						className='w-full object-cover'
					/>
				</div>
			</section>
		</div>
		<section className='flex justify-between items-center w-screen xl:w-11/12 mt-20'>
			<div className='w-3/6 h-auto'>
				<img 
					src={bg} 
					alt="cover-image" 
					className='w-full object-cover'
				/>
			</div>
			<div className='w-[45%]'>
				<h1 className="text-3xl font-bold mb-4 text-slate-800"> Our Team </h1>
				<p className="text-slate-700 mb-4">
					Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
				</p>
			</div>
		</section>
		{/* <div className="py-20 px-4 max-w-6xl mx-auto">
			<h1 className="text-3xl font-bold mb-4 text-slate-800">About Reality Realm</h1>
			<p className="text-slate-700 mb-4">
				Reality Realm is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
			</p>
			<p className="text-slate-700 mb-4">
				Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
			</p>
			<p className="text-slate-700 mb-4">
				Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
			</p>
		</div> */}
		<div className='mt-32 mb-10'>
			<Footer />
		</div>
    </AboutLayout>
  )
}

export default About