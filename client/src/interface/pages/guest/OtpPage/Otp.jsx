import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { HiOutlineMenu } from "react-icons/hi";
import bg from '../../../assets/bg2.jpg';
import Menu from "../../../components/pageComponents/Menu";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../logic/ReduxStore/features/users/usersSlice";

// const uri = 'https://reality-realm-server.onrender.com';

const Otp = () => {
    const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
        setOpen(true);
    };
  
    const [formData, setFormData] = useState({
        otp: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.otp === '') {
            setLoading(false);
            setMessage(true);
        }
    
        if (formData.otp) {
            setMessage(false);
            setLoading(true);
      
            const res = await fetch(`http://localhost:3500/users/verify`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
					email: user.email,
					otp: formData.otp
				}),
                credentials: 'include'
            });

            const data = await res.json();
            if (data.statusCode === 201) {
                setLoading(false);
                navigate('/');
            } else {
                setLoading(false);
            }
        }
    };

    return (
        <div className='relative'>
            <div className='w-screen h-screen absolute top-0 left-0'>
                <img src={bg} alt='background-cover' className='object-cover w-screen h-screen' />
            </div>
            <div className="bg-white p-3 w-full xl:w-[50vw] h-screen absolute top-0 left-0 opacity-75 xl:opacity-90 md:flex md:flex-col md:justify-around">
                <>
                    {open && <Menu open={open} setOpen={setOpen} />}
                </>
                <div className="absolute top-5 md:top-10 md:left-10">
                    <HiOutlineMenu className="text-xl sm:text-3xl md:text-5xl lg:hidden" onClick={handleOpen} />
                </div>
            
                <div className="mt-[65%] sm:mt-[30%] md:mt-[-20%]  lg:mt-0">
					<div className='flex flex-col items-center'>
						<p className='w-2/5'>
							<h1 className="font-bold text-3xl text-center cursor-pointer w-full"> RealityRealm </h1>
						</p>
					</div>
                    <h2 className="text-xl text-center font-semibold mt-5 mb-6"> Verify your Email </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto sm:max-w-sm md:max-w-md md-x:max-w-xl lg:w-[400px]">
                        <input
                            type="text"
                            placeholder="Enter 4 digits Otp code"
                            className="border border-emerald-950 text-sm p-3 pl-5 rounded-xl focus:outline-none"
                            id="otp"
                            name="otp"
                            onChange={handleChange}
                        />
                        {message ? <div className="text-red-600 text-sm"> Enter Otp code sent to your email</div> : ''}
                        <div className="md:w-[400px] md:mx-auto md-x:w-[450px] lg:w-[300px] lg:mx-auto">
                            <div className="flex flex-col gap-5">
                                <button
                                    className="bg-slate-900 p-3 text-white rounded-xl hover:opacity-95 disabled:opacity-80">
                                    {loading ? 
                                        <div className="flex justify-center items-center">
                                            <TailSpin 
                                                height="25"
                                                width="25"
                                                color="#ffffff"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                            />
                                        </div> : 'Submit Otp'
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Otp;
