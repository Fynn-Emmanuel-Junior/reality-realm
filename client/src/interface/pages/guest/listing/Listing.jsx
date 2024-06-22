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
import { IoLocationOutline, IoBedOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { GrElevator } from "react-icons/gr";
import { GiKitchenKnives } from "react-icons/gi";
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import profile from '../../../assets/profile.png';
import { GoSponsorTiers } from "react-icons/go";
import { LuParkingCircle } from "react-icons/lu";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Rings } from 'react-loader-spinner'; // Import the spinner
import TopFooterContainer from '../../../components/pageComponents/TopFooterContainer'; // Import the new component

const Listing = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBooking, setIsBooking] = useState(false); // State for booking status
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setError(""); // Clear error message when date changes
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
    if (!selectedDate) {
      setError('Please select an appointment date.');
      return;
    }

    setIsBooking(true);
    setError(""); // Clear any existing errors
    try {
      // Simulate an API call
      const response = await fetch(`http://localhost:3500/appointment/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          {
            loading ? <ListingSkeleton /> : <div>
              <div className='w-11/12 mx-auto md:hidden'>
                <Card listing={listing} />
              </div>
              <div className='flex flex-col md:hidden'>
                <div className='w-11/12 mx-auto'>
                  <h2 className='text-3xl font-medium'> {listing.name} <span className='text-lg'> {listing.description} </span> </h2>
                  <h3 className='font-medium text-lg'>Entire serviced Apartment in Accra, Ghana</h3>
                  <div className='flex items-center gap-3 mt-3'>
                    <div className='flex items-center gap-1 mt-3'>
                      <div>
                        <IoLocationOutline size={25} color='#228B22' />
                      </div>
                      <p>{listing.address}</p>
                    </div>
                    <div className='mt-2 flex items-center gap-3 '>
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
                    {listing.typeOfPlace === 'sell' ?  <p className='font-medium'> For sale : ${listing.regularPrice}</p> : <p className='font-medium'> Rent : <span> ${listing.regularPrice} per month </span></p>}
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
                        <GiKitchenKnives size={25} className='text-blue-900' />
                        <h3> Doorman </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <BsHouseDoor size={25} className='text-blue-900' />
                        <h3> Furnished </h3>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <MdOutlineLocalLaundryService size={25} className='text-blue-900' />
                        <h3> Laundry Service </h3>
                      </div>
                      <div className='p-5 rounded-lg flex gap-3 border'>
                        <CiLock size={25} className='text-blue-900' />
                        <h3> Storage available </h3>
                      </div>
                    </div>
                  </div>
                  <div className='border border-black border-b-[0.5px] my-5 border-opacity-20' />
                  <div className='flex gap-3'>
                    {
                      user ? <img
                        src={user.avatar}
                        width={60}
                        height={60}
                        className="rounded-full object-cover self-center mt-2 cursor-pointer"
                      /> : <img
                        src={profile}
                        alt='picture_profile'
                        width={60}
                        height={60}
                        className="rounded-full object-cover self-center mt-2 cursor-pointer"
                      />
                    }
                    <div className='mt-3'>
                      <p className='font-medium'> Hosted by {user.username || 'Fynn Emmanuel Junior'} </p>
                      <p> 3 years of hosting </p>
                    </div>
                  </div>
                  <div className='border border-black border-b-[0.2px] my-5 border-opacity-10' />
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-start gap-3 mt-7'>
                      <GoSponsorTiers size={25} />
                      <div>
                        <h2 className='font-medium'>{user.username || 'Fynn'} is a superhost</h2>
                        <h3>Superhosts are experienced, highly rated Hosts.</h3>
                      </div>
                    </div>
                    <div className='flex items-start gap-3 mt-5'>
                      <LuParkingCircle size={25} />
                      <div>
                        <h2 className='font-medium'> Park for free </h2>
                        <h3> This is one of the few places in the area with free parking </h3>
                      </div>
                    </div>
                    <div className='flex items-start gap-3 mt-5'>
                      <IoShieldCheckmarkOutline size={25} />
                      <div>
                        <h2 className='font-medium'> Self check-in</h2>
                        <h3> You can with the building staff </h3>
                      </div>
                    </div>
                  </div>
                  <div className='border border-black border-b-[0.2px] my-5 border-opacity-10' />
                  <div className='bg-[#F0EFE9] p-5 rounded-xl'>
                    <p className='leading-7'>
                      Truly, all you need is your luggage as you kick back and relax in this stylish studio that offers extra space and comfort as complimentary
                    </p>
                  </div>
                  <div className='border border-black border-b-[0.5px] my-5 border-opacity-20' />
                  <div className='flex flex-col gap-3'>
                    <div>
                      <h3 className='font-medium text-2xl'> House rules </h3>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <p> Check-in after 2:00PM</p>
                      <p>Check out after 11:00AM</p>
                      <p> 2 guests Maximum</p>
                    </div>
                  </div>
                  <div className='border border-black border-b-[0.5px] my-5 border-opacity-20' />
                  <div className='flex flex-col gap-3'>
                    <div>
                      <h3 className='font-medium text-2xl'> Safety & property </h3>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <p> No carbon monoxide alarm</p>
                      <p> Smoke alarm </p>
                    </div>
                  </div>
                  <div className='border border-black border-b-[0.5px] my-5 border-opacity-20' />
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
                      {selectedDate && (
                        <p>You selected: {selectedDate.toLocaleDateString()}</p>
                      )}
                      {error && (
                        <p className='text-red-500'>{error}</p>
                      )}
                    </div>
                  </div>
                  <div className='bg-pink-800 p-3 mt-5 mb-10 rounded-md'>
                    <div className='flex flex-col items-center'>
                      <button
                        className='text-white'
                        onClick={handleAppointment}
                        disabled={isBooking}
                      >
                        {isBooking ? <Rings height="30" width="30" color="white" /> : 'Book appointment'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        {!loading && <Footer />}
        {!loading && (
          <TopFooterContainer>
            <p>Your custom content here, above the footer.</p>
          </TopFooterContainer>
        )}
      </main>
    </>
  );
};

export default Listing;
