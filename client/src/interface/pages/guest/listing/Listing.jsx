import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../logic/ReduxStore/features/users/usersSlice';
import SearchNavBar from '../../../components/pageComponents/Search/SearchNavBar';
import Navbar from '../../../components/pageComponents/smallScreens/Navbar';
import Card from '../../../components/pageComponents/listing/Card';
import Footer from '../../../components/pageComponents/Footer';
import ListingSkeleton from '../../../components/customs/ListingSkeleton';
import { setImages } from '../../../../logic/ReduxStore/features/listings/CarouselSlice';
import { IoLocationOutline, IoBedOutline,IoGolf} from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { GrElevator } from "react-icons/gr";
import { GiKitchenKnives,GiPowerGenerator } from "react-icons/gi";
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineLocalLaundryService,MdOutlineMicrowave } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaBottleWater } from "react-icons/fa6";
import { TbAirConditioningDisabled,TbPool  } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuRefrigerator } from "react-icons/lu";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopFooterContainer from '../../../components/pageComponents/TopFooterContainer';

const Listing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);
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
        dispatch(setImages(listing.imageurls));
        setLoading(false);
      } catch (err) {
        setLoading(true);
        throw new Error('Cannot fetch listing');
      }
    };

    fetchListing();
  }, [id]);

  const handleAppointment = async () => {
    let token = currentUser.AccessToken;

    if (!token) {
      await fetch(`http://localhost:3500/users/refresh`);
    }

    if (!selectedDate) {
      setError('Please select an appointment date.');
      return;
    }

    setIsBooking(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:3500/appointment/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          id: currentUser._id,
          email: currentUser.email,
          appointmentDate: selectedDate,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.statusCode === 200 && currentUser) {
        navigate('/notifications');
      }
      setIsBooking(false);
    } catch (err) {
      setIsBooking(false);
      throw new Error(err);
    }
  };

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
                        <TbAirConditioningDisabled  size={25} className='text-blue-900' />
                        <h3> Air Conditioning </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <LuRefrigerator size={25} className='text-blue-900' />
                        <h3> Refrigerator </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <FaBottleWater  size={25} className='text-blue-900' />
                        <h3> Water Reservoir </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <MdOutlineMicrowave size={25} className='text-blue-900' />
                        <h3> Microwave </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <TbPool  size={25} className='text-blue-900' />
                        <h3> Swimming pool </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <BsHouseDoor size={25} className='text-blue-900' />
                        <h3> Furnished </h3>
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
                  <div className='border border-black border-b-[0.2px] my-5 border-opacity-10' />
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
                  <div>
                    <h3 className='font-medium text-2xl'> Select date for appointment </h3>
                    <div className='flex flex-col gap-3'>
                      <h2>Select Appointment Date:</h2>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        minDate={new Date()}
                        isClearable
                        showYearDropdown
                        scrollableMonthYearDropdown
                        className='border border-teal-600 w-full focus:outline-none rounded-sm'
                      />
                      {error && (
                        <p className='text-red-500'>{error}</p>
                      )}
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
      <TopFooterContainer>
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
            onClick={handleAppointment}
            disabled={isBooking}
            className='bg-pink-700 text-white py-2 mb-3 px-4 rounded mt-4'
          >
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </TopFooterContainer>
      <div className={`bottom-sheet ${showMore ? 'show' : ''}`}>
        <div className="bottom-sheet-content">
          <button onClick={() => setShowMore(false)}>
            <IoIosArrowBack size={20} />
          </button>
          <p>
            <h3 className='text-2xl font-semibold my-5'>
              About the space
            </h3>
            Luxurious studio apartment with a private bathroom, kitchenette with workspace/dining area. The apartment is located in a sought after neighborhood close to the US Embassy in Accra. The apartment has modern amenities, high end fittings, contemporary decor including a chandelier that brightens up the apartment.
            Luxurious studio apartment with a private bathroom, kitchenette with workspace/dining area. The apartment is located in a sought after neighborhood close to the US Embassy in Accra. The apartment has modern amenities, high end fittings, contemporary decor including a chandelier that brightens up the apartment.
            Luxurious studio apartment with a private bathroom, kitchenette with workspace/dining area. The apartment is located in a sought after neighborhood close to the US Embassy in Accra. The apartment has modern amenities, high end fittings, contemporary decor including a chandelier that brightens up the apartment.
          </p>
        </div>
      </div>
    </>
  );
}

export default Listing;
