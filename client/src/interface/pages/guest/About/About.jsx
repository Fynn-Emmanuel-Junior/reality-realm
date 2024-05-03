import { useEffect } from 'react'
import AboutLayout from '../../../components/layouts/AboutLayout'
import Footer from '../../../components/pageComponents/Footer'
import bg from '../../../assets/about2.jpg'
import bg1 from '../../../assets/about1.jpg'
import bg2 from '../../../assets/about3.jpg'
import { useDispatch,useSelector } from 'react-redux'
import { setMenu } from '../../../../logic/ReduxStore/features/menu/menuSlice'
import { selectMenu } from '../../../../logic/ReduxStore/features/menu/menuSlice'


const About = () => {
	const dispatch = useDispatch()
	const menu = useSelector(selectMenu)

	console.log(menu)

	useEffect(() => {
		dispatch(setMenu(true))
	},[])
  return (
    <AboutLayout>
		<section className='flex flex-col xl:flex-row xl:justify-between items-center w-screen xl:w-11/12'>
			<div className='w-11/12 mx-auto xl:w-3/6 h-[50vh] xl:h-[80vh]'>
				<img 
					src={bg} 
					alt="cover-image" 
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='w-11/12 mx-auto mt-3 xl:mt-0 xl:w-[45%]'>
				<h1 className="text-3xl font-bold mb-4 text-slate-800">About Reality Realm</h1>
				<p className="text-slate-700 mb-4">
					Reality Realm is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
				</p>
			</div>
		</section>
		<div className='flex flex-col items-end mt-10 xl:mt-20'>
			<section className='flex flex-col xl:flex-row xl:justify-between items-center w-screen xl:w-11/12'>
				<div className='w-11/12 mx-auto mt-3 xl:mt-0 xl:w-[45%]'>
					<h1 className="text-3xl font-bold mb-4 text-slate-800"> Our mission </h1>
					<p className="text-slate-700 mb-4">
						Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
				</p>
				</div>
				<div className='w-11/12 mx-auto xl:w-3/6 h-[50vh] xl:h-[80vh]'>
					<img 
						src={bg2} 
						alt="cover-image" 
						className='w-full h-full object-cover'
					/>
				</div>
			</section>
		</div>
		<section className='mt-20 flex flex-col xl:flex-row xl:justify-between items-center w-screen xl:w-11/12'>
			<div className='w-11/12 mx-auto xl:w-3/6 h-[50vh] xl:h-[80vh]'>
				<img 
					src={bg1} 
					alt="cover-image" 
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='w-11/12 mx-auto mt-3 xl:mt-0 xl:w-[45%]'>
				<h1 className="text-3xl font-bold mb-4 text-slate-800"> Our Team </h1>
				<p className="text-slate-700 mb-4">
					Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
				</p>
			</div>
		</section>
		<div className='mt-10 lg:mt-32'>
			<Footer />
		</div>
    </AboutLayout>
  )
}

export default About