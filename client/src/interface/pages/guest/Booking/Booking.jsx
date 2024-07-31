import { useState, useEffect } from 'react';
import { IoIosArrowBack,IoIosCheckmark,IoIosStar } from 'react-icons/io';
import { CgDanger } from "react-icons/cg";
import { useListing } from '../../../hooks/useListing';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBookingDate, setBookingDate } from '../../../../logic/ReduxStore/features/listings/bookingDate';
import DatePicker from '../../../components/customs/DatePicker';
import { CSSTransition } from 'react-transition-group';
import Footer from '../../../components/pageComponents/Footer';
import { GoDotFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { RotatingLines } from 'react-loader-spinner'

const Booking = () => {
    const { id } = useParams();
    const { GetListing } = useListing();
    const [listing, setListing] = useState();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [precautions,setPrecautions] = useState(false);
    const bookingDate = useSelector(selectBookingDate);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const goBack = () => {
        navigate(-1);
    };

    const handleDateChange = (date) => {
        const today = new Date();
        if(date < today) {
            setError('Selected date is in the past');
            return;
        } else {
            dispatch(setBookingDate(date));
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await GetListing(id);
            setLoading(false);
            setListing(data);
        };
        fetch();
    }, []);

    return (
        <div className='lg:hidden'>
            {
                loading ? <div className='absolute top-[43%] left-[44%]'>
                     <RotatingLines
                visible={true}
                height="70"
                width="70"
                color="#000000"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                </div> : <>
                     <div>
                <div className='w-11/12 mx-auto'>
                    <header className='flex items-center gap-20 mt-5 pb-5'>
                        <IoIosArrowBack size={20} onClick={goBack} />
                        <div className=' md:mx-auto'>
                            <p className='font-semibold md:mr-14'>Confirm and book appointment</p>
                        </div>
                    </header>
                </div>
            </div>
            <hr />
            <div>
                <div className='w-11/12 mx-auto flex items-center gap-3 my-7'>
                    <div className='w-28 md:w-80 md:h-60 h-24'>
                        <img src={listing?.imageurls[0]} alt='profile_img' className='w-full h-full rounded-2xl' />
                    </div>
                    <div>
                        <h3 className='font-semibold'>{listing?.name} - {listing?.description}</h3>
                        <div>{listing?.address}</div>
                        <div className='flex gap-2 items-center'>
                            <IoIosStar size={20} />
                            <p className='font-medium'>5.00(4)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-200 w-full h-3' />
            <div className='w-11/12 mx-auto my-7'>
                <h3 className='font-semibold text-2xl'> Your Appointment </h3>
                <div className='flex items-center justify-between'>
                    <div className='mt-5'>
                        <p className='text-lg font-medium'>Dates</p>
                        <p>{new Date(bookingDate).toLocaleDateString()}</p>
                        <CSSTransition
                          in={!!error}
                          timeout={300}
                          classNames="error"
                          unmountOnExit
                        >
                        <p className='text-red-500 border border-red-600 rounded-md p-2 mt-2'>{error}</p>
                      </CSSTransition>
                    </div>
                    <div className='font-medium text-lg underline' onClick={() => setShowDatePicker(true)}>
                        Edit
                    </div>
                </div>
                <div className='mt-5'> 
                    <p className='text-lg font-medium'>Type of place</p>
                    {
                        listing?.typeOfPlace == 'sell' && <p>For Sale</p>
                    }
                    {
                        listing?.typeOfPlace == 'rent' && <p>Rent</p>
                    }
                </div>
                <div className='mt-5'> 
                    <p className='text-lg font-medium'>Price</p>
                    {
                        listing?.typeOfPlace == 'sell' && <p>${listing?.regularPrice}</p>
                    }
                    {
                        listing?.typeOfPlace == 'rent' && <p>${listing?.regularPrice} per month</p>
                    }
                </div>
            </div>
            <div className='bg-gray-200 w-full h-3' />
            <div className='w-11/12 mx-auto my-7'>
                <h3 className='font-semibold text-2xl'> Safety Precautions </h3>
                <div className='text-red-500 border border-red-500 p-2 rounded-md mt-2'>
                    <CgDanger />
                    <p>Please ensure that this precautions are adhered to before meeting the owner of the place</p>
                </div>
                <div className='mt-3'>
                    <button 
                        className='underline font-semibold'
                        onClick={() =>  setPrecautions(true)}
                    >
                        Read precautions
                    </button>
                </div>
            </div>
            <div className='bg-gray-200 w-full h-3' />
            <div className='w-11/12 mx-auto mt-3'>
                <div>
                    <p className='text-xs'> By selecting the button ,you agree to <span className='text-blue-500'>Reality Realm</span> <span className='text-blue-500'>terms</span> and <span className='text-blue-500'>conditions</span>  <span className='text-blue-500'> policy </span> and <span className='text-blue-500'>privacy policy</span></p>
                </div> 
                <button
                    className='bg-pink-700 text-white py-2 mb-3 px-4 rounded mt-4 w-full'
                >
                    Book Appointment
                </button>
            </div> 
            <footer className='mt-5'>
              <Footer />
            </footer> 
            <div className={`bottom-sheet ${precautions ? 'show' : ''}`}>
                <div className="bottom-sheet-content">
                <button onClick={() => setPrecautions(false)}>
                    <RxCross2 size={20} />
                </button>
                <h3 className='text-xl font-bold'>Safety precautions</h3>
                <ul className='mt-5 py-3 border border-green-500 rounded-md flex flex-col gap-2 px-2'>
                    <div>
                        <li className='flex items-center gap-2'>
                            <GoDotFill />
                           <p className='font-semibold'> Communicate Clearly</p>
                        </li>
                        <div className='flex flex-col gap-2'>
                            <li className='flex items-center gap-2 ml-3 mt-1'>
                                <IoIosCheckmark size={45}/>
                            <p className='text-[13px]'> Have a thorough conversation with the owner through secure communication channels before meeting in person.</p>
                            </li>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={40}/>
                            <p className='text-[13px]'>Arrange the meeting during daylight hours and ensure someone knows about your appointment.</p>
                            </li>
                        </div>
                    </div>
                    <div>
                        <li className='flex items-center gap-2'>
                            <GoDotFill />
                           <p className='font-semibold'> Bring a friend </p>
                        </li>
                        <div className='flex flex-col gap-2 text-xs'>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'> if possible, take a friend or family member with you to the meeting.</p>
                            </li>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={45}/>
                                <p className='text-[13px]'> Inform a trusted person about your meeting details, including time, location, and contact information of the house owner.</p>
                            </li>
                        </div>
                    </div>  
                    <div>
                        <li className='flex items-center gap-2'>
                            <GoDotFill />
                           <p className='font-semibold'> Meet in Public </p>
                        </li>
                        <div className='flex flex-col gap-2 text-xs'>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'> For the first meeting, suggest a public place such as a cafe or a community center.</p>
                            </li>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'>If meeting at the property, make sure someone knows your whereabouts and schedule.</p>
                            </li>
                        </div>
                    </div> 
                    <div>
                        <li className='flex items-center gap-2'>
                            <GoDotFill />
                           <p className='font-semibold'> Check the Property </p>
                        </li>
                        <div className='flex flex-col gap-2 text-xs'>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'>Thoroughly inspect the property and ask relevant questions about it. </p>
                            </li>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'>Avoid making any payments or signing documents during the first meeting.</p>
                            </li>
                        </div>
                    </div>
                    <div>
                        <li className='flex items-center gap-2'>
                            <GoDotFill />
                           <p className='font-semibold'> Secure Payments </p>
                        </li>
                        <div className='flex flex-col gap-2 text-xs'>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'>Never make cash payments; use traceable payment methods. </p>
                            </li>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'>Ensure all transactions and agreements are done through legal and secure means.</p>
                            </li>
                        </div>
                    </div>
                    <div>
                        <li className='flex items-center gap-2'>
                            <GoDotFill />
                           <p className='font-semibold'> Use Secure Platforms </p>
                        </li>
                        <div className='flex flex-col gap-2 text-xs'>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={40}/>
                                <p className='text-[13px]'>Utilize the secure messaging and payment options provided by your website or other reliable platforms.</p>
                            </li>
                            <li className='flex items-center gap-2 ml-3'>
                                <IoIosCheckmark size={30}/>
                                <p className='text-[13px]'>Report any suspicious activities or profiles to our support team</p>
                            </li>
                        </div>
                    </div>
                </ul>
                </div>
            </div>  
            <CSSTransition
                in={showDatePicker}
                timeout={300}
                classNames="date-picker"
                unmountOnExit
            >
                <DatePicker
                    selectedDate={bookingDate}
                    onDateChange={handleDateChange}
                    onClose={() => setShowDatePicker(false)}
                />
            </CSSTransition>
                
                </>
            }
           
        </div>
    );
};

export default Booking;
