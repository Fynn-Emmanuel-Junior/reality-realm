import MainLayout from "../../../components/layouts/MainLayout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {useSelector,useDispatch} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from "../../../../logic/ReduxStore/features/users/usersSlice"
import OAuth from '../SignUp/OAuth'

const SignIn = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [message,setMessage] = useState(false)
  const [exists,setExists] = useState(false)
  const [passwordExists,setPasswordExists] = useState(false)

  
  const [formData,setFormData] = useState({})


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

    if(formData.password == '' || formData.email == '') {
      setExists(false)
      setMessage(true)
    }
    
    if(formData.email && formData.password) {
      setMessage(false)      
      // dispatch(signInStart())
      
      const res = await fetch('/api/users/auth',
        { 
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await res.json()

      if(data.message === 'user not found' ){
        setTimeout(() => {
          setExists(true)
        },500)
 
        setPasswordExists(false)
        setExists(false)
        dispatch(signInFailure(data))

        
      } else if(data.message === ' Unauthorized user'){

        setPasswordExists(true)
        setExists(false)
        dispatch(signInFailure(data))
        
      } else{
        setPasswordExists(false)
        dispatch(signInSuccess(data))
        setExists(false)
        navigate('/')
          
      }

    
    }

    
  }


  return (
    <MainLayout>
      <div className="p-3 max-w-md sm:max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7"> Sign In </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <>
              {
                exists ? <div className="text-red-600"> User not found!</div> : ''
              }
            </>
            <>
              {
                passwordExists ? <div className="text-red-600"> Wrong credentials!</div> : ''
              }
            </>

            <input 
              type="text" 
              placeholder="email"
              className="border p-3  rounded-lg focus:outline-none"
              id="email"
              name="email"
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
              // disabled={loading} 
              className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"> 
                Sign in
            </button>
            <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p> Don't have an account </p>
          <Link to='/signup'> 
            <span className="text-blue-700"> Sign Up </span>
           </Link>
        </div>
      </div> 
    </MainLayout>
  )
}

export default SignIn