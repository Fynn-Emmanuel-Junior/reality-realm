import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
    const [landlord,setLandlord] = useState(null)
    const [message,setMessage] = useState(null)
    const [error,setError] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${listing.userRef}`)
    
                const data = await res.json()
    
                setLandlord(data)

            } catch(err) {
                setError(true)
            }
        }

        fetchUser()
    },[listing.userRef])

    console.log(landlord)

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }
   
  return (
    <>
        {
            landlord && 
                <div className='flex flex-col gap-2'>
                    <p>
                        Contact <span className='font-semibold'>{landlord.username}</span> {" "}
                            for  {" "}
                            <span className='font-semibold'>{listing.name.toLowerCase()}
                        </span>
                    </p>
                    <textarea 
                        name="message" 
                        id="message" 
                        rows="3" 
                        placeholder='Enter your message here'
                        className='resize-none focus:outline-none p-3 w-full border rounded-lg'
                        value={message}
                        onChange={handleMessage}
                    />
                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
                        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'                    
                    >
                        send message
                    </Link>
                    

                </div>
        }
    </>
  )
}

export default Contact