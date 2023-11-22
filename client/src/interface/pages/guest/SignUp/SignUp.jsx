import MainLayout from "../../../components/layouts/MainLayout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import OAuth from "./OAuth"


const SignUp = () => {

  const navigate = useNavigate()
  
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState(false)
  const [exists,setExists] = useState(false)
  
  const [formData,setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value
      }
    )

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(formData.username == '' || formData.password == '' || formData.email == '') {
      setExists(false)
      setLoading(false)
      setMessage(true)
    }
    
    if(formData.username && formData.email && formData.password) {
      setMessage(false)
      setLoading(true)
      
      
      const res = await fetch('/api/users/register',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            WithCredentials: true
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await res.json()

      if(data.message === 'User already exists') {

        setTimeout(() => {
          setExists(true)
        },500)

        setExists(false)
        setLoading(false)

        
      } else{
 
        setExists(false)
        setLoading(false)
        navigate('/signin')
          

      }
    } 
  }


  return (
    <MainLayout>
      <div className="p-3 max-w-md sm:max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7"> Sign up </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <>
              {
                exists ? <div className="text-red-600"> User already exists</div> : ''
              }
            </>
            <input 
              type="text" 
              placeholder="username"
              className="border p-3  rounded-lg focus:outline-none"
              id="username"
              name="username"
              required
              onChange={handleChange}
            />
            <>
            {
               message ? <div className="text-red-600 text-sm">
                please fill all fields
               </div> : ''
            } 
            </>
            <input 
              type="email" 
              placeholder="email"
              className="border p-3  rounded-lg focus:outline-none"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
            {
              message ? <div className="text-red-600 text-sm">
                please fill all fields
              </div> : ''
            } 
            <input 
              type="password" 
              placeholder="password"
              className="border p-3  rounded-lg focus:outline-none"
              id="password"
              name="password"
              onChange={handleChange}
            />
            {
              message ? <div className="text-red-600 text-sm">
                please fill all fields
              </div> : ''
            } 
            <button
              disabled={loading} 
              className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"> 
                {
                  loading ? 'Loading...' : 'Sign Up'
                } 
            </button>
            <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p> Have an account ? </p>
          <Link to='/signin'> 
            <span className="text-blue-700"> Sign In </span>
           </Link>
        </div>
      </div> 
    </MainLayout>
  )
}

export default SignUp