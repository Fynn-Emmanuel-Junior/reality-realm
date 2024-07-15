import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "./OAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TailSpin } from "react-loader-spinner";
import { HiOutlineMenu } from "react-icons/hi";
import bg from '../../../assets/bg2.jpg';
import Menu from "../../../components/pageComponents/Menu";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [exists, setExists] = useState(null);
  const [passwordExists, setPasswordExists] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handlePassword = () => {
    setShowpassword(!showpassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === '' || formData.password === '' || formData.email === '') {
      setLoading(false);
      setMessage(true);
    }

    if (formData.username && formData.email && formData.password) {
      setMessage(false);
      setLoading(true);

      try {
        const res = await fetch(`http://localhost:3500/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });

        const data = await res.json();
        if (data.statusCode === 201) {
          setExists(false);
          setLoading(false);
          navigate('/otp');
        } else {
          setExists(data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error during registration:', error);
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
        {open && <Menu open={open} setOpen={setOpen} />}
        <div className="absolute top-5 md:top-10 md:left-10">
          <HiOutlineMenu className=" text-xl sm:text-3xl md:text-5xl lg:hidden" onClick={handleOpen} />
        </div>
        <div className="mt-[15%] md:mt-0">
          <Link to='/'>
            <h1 className="font-bold text-3xl text-center cursor-pointer"> RealityRealm </h1>
          </Link>
          <h2 className="text-xl text-center font-semibold mt-5 mb-6"> Create your account! </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto sm:max-w-sm  md:max-w-md md-x:max-w-xl lg:max-w-xl xl:max-w-lg">
            {exists && <div className="text-red-600">{exists}</div>}
            {passwordExists && <div className="text-red-600">Wrong credentials!</div>}
            <input
              type="text"
              placeholder="firstname"
              className="border border-emerald-950  text-sm p-3 pl-5 rounded-xl focus:outline-none"
              id="firstname"
              name="firstname"
              onChange={handleChange}
            />
            
            <input
              type="text"
              placeholder="surname"
              className="border border-emerald-950  text-sm p-3 pl-5 rounded-xl focus:outline-none"
              id="surname"
              name="surname"
              onChange={handleChange}
            />
            {message && <div className="text-red-600 text-sm animate-message">Please fill all fields</div>}
            <input
              type="text"
              placeholder="phonenumber"
              className="border border-emerald-950  text-sm p-3 pl-5 rounded-xl focus:outline-none"
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleChange}
            />
            {message && <div className="text-red-600 text-sm animate-message">Please fill all fields</div>}
            <input
              type="text"
              placeholder="email"
              className="border border-emerald-950  text-sm p-3 pl-5 rounded-xl focus:outline-none"
              id="email"
              name="email"
              onChange={handleChange}
            />
            {message && <div className="text-red-600 text-sm animate-message">Please fill all fields</div>}
            <div className="w-full flex items-center justify-center border border-emerald-950 rounded-xl p-3 px-5 ">
              <input
                type={showpassword ? 'text' : 'password'}
                placeholder="password"
                className="w-full focus:outline-none text-sm"
                id="password"
                name="password"
                onChange={handleChange}
              />
              {showpassword ? <FiEye onClick={handlePassword} /> : <FiEyeOff onClick={handlePassword} />}
            </div>
            {message && <div className="text-red-600 text-sm animate-message">Please fill all fields</div>}
            <div className="md:w-[400px] md:mx-auto md-x:w-[450px] lg:w-[500px] xl:w-[450px] lg:mx-auto">
              <div className="flex flex-col gap-5">
                <button
                  className="bg-slate-900 p-3 text-white rounded-xl hover:opacity-95 disabled:opacity-80">
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <TailSpin
                        height="25"
                        width="25"
                        color="#ffffff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                      />
                    </div>
                  ) : 'Create Account'}
                </button>
                <OAuth />
              </div>
            </div>
          </form>
          <div className="flex justify-center gap-2 mt-5">
            <p>Already have an account?</p>
            <Link to='/signin'>
              <span className="text-blue-700">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
