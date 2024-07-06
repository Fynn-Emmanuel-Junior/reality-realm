import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import SearchNavBar from '../../../components/pageComponents/Search/SearchNavBar';
import Navbar from '../../../components/pageComponents/smallScreens/Navbar';
import Card from '../../../components/pageComponents/listing/Card';
import Footer from '../../../components/pageComponents/Footer';
import ListingSkeleton from '../../../components/customs/ListingSkeleton';
import { setImages } from '../../../../logic/ReduxStore/features/listings/CarouselSlice';
import { IoLocationOutline, IoBedOutline, IoGolf } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { GrElevator } from "react-icons/gr";
import { GiKitchenKnives, GiPowerGenerator } from "react-icons/gi";
import { FaUserShield,FaUser } from "react-icons/fa";
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineLocalLaundryService, MdOutlineMicrowave, MdOutlineStore } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaBottleWater } from "react-icons/fa6";
import { TbAirConditioningDisabled, TbPool } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuRefrigerator } from "react-icons/lu";
import 'react-datepicker/dist/react-datepicker.css';
import TopFooterContainer from '../../../components/pageComponents/TopFooterContainer';
import profile from '../../../assets/profile.png';
import { RxCross2 } from "react-icons/rx";
import { setBookingDate } from '../../../../logic/ReduxStore/features/listings/bookingDate';
import { CSSTransition } from 'react-transition-group';
import DatePicker from '../../../components/customs/DatePicker';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Listing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const [showDatePicker,setShowDatePicker] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [messageOwner,setMessageOwner] = useState(false);
  const [ownerDetails,setOwnerDetails] = useState(false);
  const [amenities,setAmenities] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setError("");
  };

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3500/listings/getlisting/${id}`);
        const data = await res.json();
        setListing(data);
        dispatch(setImages(data.imageurls));
        setLoading(false);
      } catch (err) {
        setLoading(true);
        throw new Error('Cannot fetch listing');
      }
    };

    fetchListing();
  }, []);


  return (
    <>
      <SearchNavBar />
      <Navbar />
      <main className='w-screen lg:w-11/12 md:mx-auto'>
        <div>
          {loading ? <ListingSkeleton /> : (
            <div>
              <div className='w-11/12 mx-auto md:hidden'>
                <Card listing={listing} />
              </div>
              <div className='flex flex-col md:hidden'>
                <div className='w-11/12 mx-auto'>
                  <h2 className='text-3xl font-medium'>{listing.name} <span className='text-lg'>{listing.description}</span></h2>
                  <h3 className='font-medium text-lg'>Entire serviced Apartment in Accra, Ghana</h3>
                  <div className='flex items-center gap-3 mt-3'>
                    <div className='flex items-center gap-1 mt-3'>
                      <div>
                        <IoLocationOutline size={25} color='#228B22' />
                      </div>
                      <p>{listing.address}</p>
                    </div>
                    <div className='mt-2 flex items-center gap-3'>
                      <div className='flex items-center gap-1'>
                        <BiBath size={25} />
                        <span className='text-base'>{listing.bathrooms}</span>
                      </div>
                      <div className='bg-black w-3 h-3 rounded-full'></div>
                      <div className='flex items-center gap-1'>
                        <IoBedOutline size={25} />
                        <span className='text-base'>{listing.bedrooms}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {listing.typeOfPlace === 'sell' ? <p className='font-medium'> For sale : ${listing.regularPrice}</p> : <p className='font-medium'> Rent : <span> ${listing.regularPrice} per month </span></p>}
                  </div>
                  <div className='border border-black border-b-[0.5px] my-5 border-opacity-20' />
                  <div>
                    <h2 className='text-2xl font-medium my-3'> Amenities </h2>
                    <div className='flex gap-3 w-full'>
                      <div className='border p-5 rounded-xl flex gap-3 w-1/2'>
                        <LiaUserAstronautSolid size={25} className='text-blue-900' />
                        <h3> Doorman </h3>
                      </div>
                      <div className='border p-5 rounded-xl flex gap-3 w-1/2'>
                        <GrElevator size={25} className='text-blue-900' />
                        <h3> Elevator </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <GiPowerGenerator size={25} className='text-blue-900' />
                        <h3> Generator </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <BsHouseDoor size={25} className='text-blue-900' />
                        <h3> Furnished </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <TbAirConditioningDisabled size={25} className='text-blue-900' />
                        <h3> Air Conditioning </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <LuRefrigerator size={25} className='text-blue-900' />
                        <h3> Refrigerator </h3>
                      </div>
                    </div>
                  </div>
                  <div className='border border-pink-600  mt-3 rounded-md p-2'>
                      <div className='flex flex-col items-center'>
                        <button className='font-semibold' onClick={() => setAmenities(true)}> Show all amenities</button>
                      </div>
                  </div>
                  <div className='border border-black border-b-[0.2px] my-5 border-opacity-10' />
                  <div>
                    <h3 className='font-semibold'> House location  </h3>
                    <div style={{ height: '400px', width: '100%' }}>
                      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                        <GoogleMap
                          mapContainerStyle={{ height: '400px', width: '100%' }}
                          center={{
                            lat: listing.latitude || 0,
                            lng: listing.longitude || 0,
                          }}
                          zoom={15}
                        >
                          <Marker
                            position={{
                              lat: listing.latitude || 0,
                              lng: listing.longitude || 0,
                            }}
                          />
                        </GoogleMap>
                      </LoadScript>
                    </div>
                    {/*Put google map here*/}

                  </div>
                  <div className='border border-black border-b-[0.2px] my-5 border-opacity-10 w-full' />
                  <div className="listing-details">
                    <p>
                      Luxurious studio apartment with a private bathroom, kitchenette with workspace/dining area. The apartment is located in a sought after neighborhood close to the US Embassy in Accra. The apartment has modern amenities, high end fittings, contemporary decor including a chandelier that brightens up the apartment.
                      ......
                    </p>
                    <div className="show-more-container">
                      <button onClick={() => setShowMore(true)} className="font-semibold underline">
                        <span className='flex items-center'> Show more <IoIosArrowForward size={20} /></span>
                      </button>
                    </div>
                  </div>
                  <div className='border border-black border-b-[0.2px] my-5 border-opacity-10' />
                  {/* Owner details*/}
                  <div>
                    <h3 className='text-xl font-semibold'> Meet Host </h3>
                    <div className="owner-details bg-white shadow-xl p-5 rounded-lg mt-5">
                      <div className='flex gap-10 items-start'>
                        <div>
                          <img src={profile} alt='profile_img' width={150} height={150}/>
                          <h3 className='text-xl font-semibold'>{"Fynn Emmanuel Junior"}</h3>
                          <p className='text-center font-medium'> Owner </p>
                        </div>
                        <div>
                          <div>
                            <FaUserShield size={25}/>
                            <div>
                              <h3 className='text-lg font-bold'>{"Verified"}</h3>
                            </div>
                          </div>
                          <div className='border border-black border-b-[0.2px] my-5 border-opacity-10 w-full' />
                          <div>
                            <p className='text-xl'>6</p>
                            <div>
                              <h3 className='text-lg font-bold'>{"Reviews"}</h3>
                            </div>
                          </div>
                          <div className='border border-black border-b-[0.2px] my-5 border-opacity-10 w-full' />
                          <div>
                            < FaUser size={25}/>
                            <div>
                              <h3 className='text-lg font-bold'>{"10 months hosting"}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p 
                        className='mt-10 mb-7 text-base border border-pink-600 w-1/3 text-center rounded-md'
                        onClick={() => setOwnerDetails(true)}
                      >Owner details</p><hr />
                      <div className='mt-3'>
                        <p>Response rate: 100%</p>
                        <p>Response within an hour</p>
                      </div>
                      <button 
                        className='bg-black px-5 py-3 my-5 text-white rounded-lg font-medium'
                        onClick={() => setMessageOwner(true)}
                      > Message Owner</button>
                    </div>
                  </div>

                  <div className='border border-black border-b-[0.2px] my-5 border-opacity-10' />
                  <div>
                    <h3 className='font-medium text-2xl'> Select date for appointment </h3>
                    <div className='flex flex-col gap-3'>
                      <h2>Select Appointment Date:</h2>
                      <button 
                        className='bg-black px-5 py-3 my-2 text-white rounded-lg font-medium'
                        onClick={() => setShowDatePicker(true)}
                      > Select date</button>
                      <CSSTransition
                          in={!!error}
                          timeout={300}
                          classNames="error"
                          unmountOnExit
                      >
                        <p className='text-red-500 border border-red-600 rounded-md p-2'>{error}</p>
                      </CSSTransition>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className='mt-10'>
        {!loading && <Footer />}
      </div>
      {
        !loading &&  <TopFooterContainer>
        <div className='flex items-center justify-between'>
          <div>
            <div>
              {listing.typeOfPlace === 'sell' ? <p className='font-medium'> For sale : ${listing.regularPrice}</p> : <p className='font-medium'> Rent : <span> ${listing.regularPrice} per month </span></p>}
              <div>
                {selectedDate && (
                  <p>Appointment Date: {selectedDate.toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() =>{
              dispatch(setBookingDate(selectedDate));
              if(selectedDate) {
                navigate(`/booking/${id}`);
              }
              if(!selectedDate) {
                setError('Please select an appointment date');
              }
            } }
            className='bg-pink-700 text-white py-2 mb-3 px-4 rounded mt-4'
          >
            Book Appointment
          </button>
        </div>
      </TopFooterContainer>
      }
     
      <div className={`bottom-sheet ${showMore ? 'show' : ''}`}>
        <div className="bottom-sheet-content">
          <button onClick={() => setShowMore(false)}>
            <IoIosArrowBack size={20} />
          </button>
          <div>
            <h3 className='text-2xl font-semibold my-5'>
              About the space
            </h3>
            Luxurious studio apartment with a private bathroom, kitchenette with workspace/dining area. The apartment is located in a sought after neighborhood close to the US Embassy in Accra. The apartment has modern amenities, high end fittings, contemporary decor including a chandelier that brightens up the apartment.
            Luxurious studio apartment with a private bathroom, kitchenette with workspace/dining area. The apartment is located in a sought after neighborhood close to the US Embassy in Accra. The apartment has modern amenities, high end fittings, contemporary decor including a chandelier that brightens up the apartment.
            Luxurious studio apartment with a private bathroom, kitchenette with workspace/dining area. The apartment is located in a sought after neighborhood close to the US Embassy in Accra. The apartment has modern amenities, high end fittings, contemporary decor including a chandelier that brightens up the apartment.
          </div>
        </div>
      </div>
      <div className={`bottom-sheet ${messageOwner ? 'show' : ''}`}>
        <div className="bottom-sheet-content">
          <button onClick={() => setMessageOwner(false)}>
            <RxCross2 size={20} />
          </button>
          <div>
            <h3 className='text-lg font-semibold my-5'>
             Message Host {"Fynn Emmanuel"}
            </h3>
            <textarea 
              className='border border-teal-700 focus:outline-none p-3 w-96 rounded-lg'
            />
            <div className='mt-3'>
              <button 
                  className='bg-black px-5 py-3 text-white rounded-lg font-medium'
              > Message Host</button>
            </div>
           
          </div>
        </div>
      </div>
      <div className={`bottom-sheet ${ownerDetails ? 'show' : ''}`}>
        <div className="bottom-sheet-content">
          <button onClick={() => setOwnerDetails(false)}>
            <RxCross2 size={20} />
          </button>
          <div>
            <h3 className='text-lg font-semibold my-5'>
             Host Details
            </h3>
            <textarea 
              className='border border-teal-700 focus:outline-none p-3 w-96 rounded-lg'
            />
          </div>
        </div>
      </div> 
      <div className={`bottom-sheet ${amenities ? 'show' : ''}`}>
        <div className="bottom-sheet-content">
          <button onClick={() => setAmenities(false)}>
            <IoIosArrowBack size={20} />
          </button>
          <div>
            <div>
                    <h2 className='text-2xl font-medium my-3'> Amenities </h2>
                    <div className='flex gap-3 w-full'>
                      <div className='border p-5 rounded-xl flex gap-3 w-1/2'>
                        <LiaUserAstronautSolid size={25} className='text-blue-900' />
                        <h3> Doorman </h3>
                      </div>
                      <div className='border p-5 rounded-xl flex gap-3 w-1/2'>
                        <GrElevator size={25} className='text-blue-900' />
                        <h3> Elevator </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <GiPowerGenerator size={25} className='text-blue-900' />
                        <h3> Generator </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <BsHouseDoor size={25} className='text-blue-900' />
                        <h3> Furnished </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <TbAirConditioningDisabled size={25} className='text-blue-900' />
                        <h3> Air Conditioning </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <LuRefrigerator size={25} className='text-blue-900' />
                        <h3> Refrigerator </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <FaBottleWater size={25} className='text-blue-900' />
                        <h3> Water Reservoir </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <MdOutlineMicrowave size={25} className='text-blue-900' />
                        <h3> Microwave </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <TbPool size={25} className='text-blue-900' />
                        <h3> Swimming pool </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <MdOutlineStore size={25} className='text-blue-900' />
                        <h3> Convenient store </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <GiKitchenKnives size={25} className='text-blue-900' />
                        <h3> Kitchen </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <IoGolf size={25} className='text-blue-900' />
                        <h3> Mini Golf </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <MdOutlineLocalLaundryService size={25} className='text-blue-900' />
                        <h3> Laundry Service </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <CiLock size={25} className='text-blue-900' />
                        <h3> Secure </h3>
                      </div>
                    </div>
            </div>
          </div>
        </div>
      </div>    
      <CSSTransition
        in={showDatePicker}
        timeout={300}
        classNames="date-picker"
        unmountOnExit
      >
        <DatePicker
            onDateChange={handleDateChange}
            onClose={() => setShowDatePicker(false)}
        />
        </CSSTransition>
    </>
  );
}

export default Listing;
