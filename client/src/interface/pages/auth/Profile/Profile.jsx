import MainLayout from "../../../components/layouts/MainLayout"
import {useSelector} from 'react-redux'
import {selectCurrentUser,selectLoading} from '../../../../logic/ReduxStore/features/users/usersSlice'
import { useDispatch } from "react-redux"
import { updateUserSuccess,updateUserStart,deleteUserSucess,signOut } from "../../../../logic/ReduxStore/features/users/usersSlice"
import { useRef,useState,useEffect } from "react"
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../../utilis/firebase'
import { Link } from "react-router-dom"

const Profile = () => {
  const currentuser = useSelector(selectCurrentUser)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()
  
  const fileRef = useRef(null)
  const [file,setFile] = useState(undefined)
  const [filePercentage,setFilePercentage] = useState(0)
  const [error,setError] = useState(false)
  const [updatemessage,setupdatemessage] = useState(false)
  const [formData,setformData] = useState({})
  
  // firebase image storgae rules to publish
  /*  
      allow read;
      allow write: if
      request.resource < 2 * 1024  * 1024 && 
      request.resource.contentType.matches('image/.*');
  */

    useEffect(() => {
      if(file) {
        handleFileUpload(file);
      }
    },[file])

    // Store image into firebase storage
      const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const FileName = new Date().getTime() + file.name
        const storageRef = ref(storage,FileName)

        // Get the percentage of file upload
        const uploadTask = uploadBytesResumable(storageRef,file)

        // Listen to the percentage of file upload
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
          setFilePercentage(Math.round(progress))
        },
        (error) => {
          setError(true)
        },

        // download image and pass it to the file state for upload
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setformData({...formData,avatar: downloadURL});
              }
            )
            .catch((error) => console.log(' Error in getting download URL' + error))
            
        }
        
      );

    }

    const handleChange =  (e) => {
      setformData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      dispatch(updateUserStart())

      const res = await fetch('/api/users/update', 
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )
      
      const data = await res.json()
      
      if(data) {
        dispatch(updateUserStart())
        dispatch(updateUserSuccess(data))
        setupdatemessage(true)
      }

    }

    const handleDelete = async () => {
      try {
        const res = await fetch('/api/users/delete', {
          method: 'DELETE'
        })

        const data = await res.json()
        dispatch(deleteUserSucess())
        
      } catch(err) {
        console.log(err.message)
      }
    }

    const handleSignout = async (req,res) => {
      try {
        const res = await fetch('/api/users/signout')
        const data = await res.json()
       
        dispatch(signOut())

      } catch(err) {
        console.log(err.message)
      }
    }



  return (
    <MainLayout>
      <div className="max-w-lg p-3 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7"> Profile </h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input 
              type="file"  
              ref={fileRef} 
              hidden 
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img 
              src={formData.avatar || currentuser.avatar} 
              alt="profile" 
              className="rounded-full h-24 w-24 object-cover  self-center mt-2 cursor-pointer"
              onClick={() => fileRef.current.click()}
            />
            <p className="text-sm self-center">
              {
                error ? <span> Error occurred when uploading image  ( images must be less than 2MB)</span> 
                : filePercentage > 0 && filePercentage < 100 ? <span className="text-green-700">  {`Uploading ${filePercentage} ...`} </span>
                : filePercentage == 100 ? <span className="text-green-700"> Image uploaded succcessfully </span> : ''
              }
            </p>
            <input 
              type="text" 
              placeholder='username'
              className="border rounded-lg p-3 focus:outline-none"
              defaultValue={currentuser.username}
              id="username"
              onChange={handleChange}
            />
            <input 
              type="email" 
              placeholder="email"
              className="border rounded-lg p-3 focus:outline-none"
              defaultValue={currentuser.email}
              id="email"
              onChange={handleChange}
            />
            <input 
              type="password" 
              placeholder='password'
              className="border rounded-lg p-3 focus:outline-none"
              id="password"
              onChange={handleChange}
            />
            <button 
              disabled={loading}
              className="bg-slate-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80"
            > {
                loading ? 'loading...' : 'update'
              } </button>
            <Link className="bg-green-700 text-center rounded-lg text-white uppercase p-3 w-full" to={'/create-listing'}>
              Create Listing
            </Link>  
        </form>
        <div className='flex justify-between mt-5'>
          <span onClick={handleDelete} className='text-red-700 cursor-pointer'> Delete account </span>
          <span onClick={handleSignout} className='text-red-700 cursor-pointer'> Sign out </span>
        </div>
        <div className='text-green-700 my-3'>
          {
            updatemessage ? 'user updated successfully' : ''
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default Profile