import React, {useState} from 'react'
import MainLayout from "../../../components/layouts/MainLayout"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../../utilis/firebase'
import { selectCurrentUser } from '../../../../logic/ReduxStore/features/users/usersSlice'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { TailSpin } from  'react-loader-spinner'

const CreateListing = () => {
    const navigate = useNavigate()
    const user = useSelector(selectCurrentUser)
    
    const [files,setFiles] = useState([])
    const [formData,setFormData] = useState({
        name: '',
        description: '',
        address: '',
        typeOfPlace: 'sell',
        furnished: false,
        parking: false,
        offer: false,
        bathrooms: 1,
        bedrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        imageurls: [],
        userRef: user._id
    })
    const [imageError,setImageError] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const [success,setSuccess] = useState(null)
    

    const handleImages =  (e) => {
        e.preventDefault()

        let images = []
     
        if(files.length > 0 && files.length < 8 ) {
            setLoading(true)
            for(let i = 0; i < files.length; i++) {
                images.push(storeImages(files[i]))
            }
        
            Promise.all(images)
            .then((url) => {
                setFormData({...formData,imageurls: formData.imageurls.concat(url)})
                setImageError(false)
                setLoading(false)
    
            })
            .catch((err)=> {
               setImageError('Image upload failed ( image size should be 2mb max)')
               setLoading(false)
            })

            

        }else {
            setImageError('Image upload max should be 6')
            setLoading(false)
        }
    }

    const storeImages = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage,fileName)
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`Uploading is ${progress} done `)
            },
            (error)=>{
               reject(error)
            },
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL)
                    })
                    .catch((err) => {
                        console.log(`err in downloading images\n${err.message}`)
                    })
                }

            )
        })
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageurls: formData.imageurls.filter((url,i) => i!== index)
        })
    }

    const handleChange = (e) => {
        if(e.target.id === 'sell' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                typeOfPlace: e.target.id
            })
        }

        if(e.target.id ===  'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        } 

        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id] : e.target.value
            })
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess(true)

        try {

            if(formData.imageurls.length < 1) return setError('You must upload at least one image')
            if(+formData.regularPrice < +formData.discountPrice) return setError('Discount Price must be less than Regular price')

            const res = await fetch('/api/listings/create', 
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            )
    
            const data = await res.json()
            console.log(data)
        
            setSuccess(false)
            navigate(`/listing/${data._id}`)
           

        } catch(err) {
            setError(err.message)
            setSuccess(false)
            console.log(err.message)
        }


    }

  return (
    <MainLayout>
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold my-7 text-center'> Create a listing </h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        id="name" 
                        className='border rounded-lg p-3 focus:outline-none'
                        maxLength={62}
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                     <textarea 
                        type="textarea" 
                        placeholder="Description"  
                        id="description" 
                        className='border rounded-lg p-3 focus:outline-none resize-none'
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input 
                        type="text" 
                        placeholder="Address"  
                        id="address"  
                        className='border rounded-lg p-3 focus:outline-none'
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className='flex  gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='sell' 
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.typeOfPlace === 'sell'}
                            />
                            <span> Sell </span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='rent' 
                                className='w-5' 
                                onChange={handleChange}
                                checked={formData.typeOfPlace === 'rent'}
                            />
                            <span> Rent </span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox" 
                                id='parking' 
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span> Parking Spot </span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='furnished' 
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span> Furnished </span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='offer' 
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span> Offer </span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='bedrooms' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300 p-1 text-center'
                                required
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />
                            <span>Beds</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='bathrooms' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300 p-1 text-center'
                                required
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <span>Baths</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='regularPrice' 
                                min={50} 
                                max={20000}
                                className='focus:outline-none border border-gray-300 p-1 text-center'
                                required
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className='flex flex-col items-center'>
                                <p> Regular Price </p>
                                <span className='text-xs'> ($ / month) </span>
                            </div>
                        </div>
                        {
                            formData.offer && 
                                <div className='flex gap-2'>
                                    <input 
                                        type="number" 
                                        id='discountPrice' 
                                        min={50} 
                                        max={100000}
                                        className='focus:outline-none border border-gray-300 p-1 text-center'
                                        required
                                        onChange={handleChange}
                                        value={formData.discountPrice}
                                    />
                                    <div className='flex flex-col items-center'>
                                        <p> Discount Price </p>
                                        <span className='text-xs'> ($ / month) </span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>  
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'> The first image will be the cover (max 6) </span>
                    </p>
                    <div  className='flex gap-4'>
                        <input 
                            type="file" 
                            id='images' 
                            accept='images/*'
                            multiple 
                            className='p-3 border border-gray-600 rounded w-full'
                            required
                            onChange={(e) => setFiles(e.target.files)}
                        /> 
                        <button 
                            type='button'
                            onClick={handleImages} 
                            className='p-3 text-green-600 border border-green-600 rounded hover:shadow-lg'
                        > 
                            {
                                loading ?
                                <TailSpin 
                                    height="25"
                                    width="25"
                                    color="#4fa94d"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    wrapperStyle={{}}
                                    wrapperClass=""    
                                /> : 'Upload'
                            }
                        </button>
                    </div>
                    {
                        formData.imageurls.length > 0 && formData.imageurls.map((url,index) => (
                            <div key={index} className='flex justify-between items-center p-3 border border-slate-300'>
                                <div className='w-60'>
                                    <img src={url} alt="listing image" className=' h-20 object-cover rounded-sm'/>
                                </div>
                                <button 
                                    type='button' 
                                    className='text-red-700'
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    Delete
                                </button>
                            </div>   
                        ))
                    }
                    <button className='bg-slate-700  uppercase text-white p-3 rounded-lg hover:opacity-95'> 
                        {
                            success ? 
                            <div className='flex gap-3  justify-center items-center'>
                                <TailSpin 
                                    height="25"
                                    width="25"
                                    color="#ffffff"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                />
                               
                            </div> : 'Create listing'
                                 
                        } 
                    </button>
                    <p className='text-red-700'>
                        {
                            imageError && imageError
                        }
                    </p>
                    <p>
                        {
                            error && <span className='text-red-600 text-sm p-3'>{error}</span>
                        }
                    </p>
                   
                </div>
            </form>
        </main>
    </MainLayout>
  )
}

export default CreateListing