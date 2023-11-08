import { GoogleAuthProvider ,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../../../utilis/firebase'
import { signInSuccess } from '../../../../logic/ReduxStore/features/users/usersSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
        <button 
            type='button' 
            className='bg-red-700 text-white p-3 uppercase rounded-lg'
            onClick={handleGoogleClick}
        >
            continue with google
        </button>
    )
}

export default OAuth