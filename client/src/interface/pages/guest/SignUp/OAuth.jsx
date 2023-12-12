import { GoogleAuthProvider ,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../../../utilis/firebase'
import { signInSuccess } from '../../../../logic/ReduxStore/features/users/usersSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import google from '../../../assets/google.png'
// import { useState } from 'react'

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try { 
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)

            const res = await fetch('/api/users/google', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })

            })
 
            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')

        } catch(err) {
            console.log('could not sign in  google', err.message)
        }
    }

    return (
        <div className='border border-slate-900 p-1.5 sm:p-2 xl:p-2 uppercase rounded-3xl w-full'>
            <button 
                type='button' 
                className='flex gap-1 items-center mx-auto'
                onClick={handleGoogleClick}
            >
                <img src={google} alt="google icon"  className='w-6 sm:w-7 xl:w-6 '/>
                <p className='text-base'>Continue with google</p>
            </button>

        </div>
    )
}

export default OAuth