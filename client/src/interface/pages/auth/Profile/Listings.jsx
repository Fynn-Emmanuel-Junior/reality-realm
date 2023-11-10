import React, {useState} from 'react'
import MainLayout from "../../../components/layouts/MainLayout"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../../utilis/firebase'

const Listings = () => {
    const [files,setFiles] = useState([])
    const [formData,setFormData] = useState({
        imageurls: []
    })
    const [imageError,setImageError] = useState(null)
    const [loading,setLoading] = useState(false)
    
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

  return (
    <MainLayout>
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold my-7 text-center'> Create a listing </h1>
            <form className='flex flex-col sm:flex-row gap-10'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        id="name" 
                        className='border rounded-lg p-3 focus:outline-none'
                        minLength={10}
                        maxLength={62}
                        required
                    />
                     <textarea 
                        type="text" 
                        placeholder="Description"  
                        id="description" 
                        className='border rounded-lg p-3 focus:outline-none resize-none'
                        required
                        
                    />
                    <input 
                        type="text" 
                        placeholder="Address"  
                        id="address"  
                        className='border rounded-lg p-3 focus:outline-none'
                        required
                    />
                    <div className='flex  gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sell' className='w-5'/>
                            <span> Sell </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5'/>
                            <span> Rent </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5'/>
                            <span> Parking Spot </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5'/>
                            <span> Furnished </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5'/>
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
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <span>Beds</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='bathrooms' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <span>Baths</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='regularPrice' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <div className='flex flex-col items-center'>
                                <p> Regular Price </p>
                                <span className='text-xs'> ($ / month) </span>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="number" 
                                id='discountPrice' 
                                min={1} 
                                max={10}
                                className='focus:outline-none border border-gray-300'
                                required
                            />
                            <div className='flex flex-col items-center'>
                                <p> Discount Price </p>
                                <span className='text-xs'> ($ / month) </span>
                            </div>
                        </div>
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
                            onChange={(e) => setFiles(e.target.files)}
                        /> 
                        <button 
                            type='button'
                            onClick={handleImages} 
                            className='p-3 text-green-600 border border-green-600 rounded hover:shadow-lg'
                        > 
                            {
                                loading ? 'Uploading...' : 'Upload'
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
                    <button className='bg-slate-700 uppercase text-white p-3 rounded-lg hover:opacity-95'> create listing </button>
                    <p className='text-red-700'>
                        {
                            imageError && imageError
                        }
                    </p>
                   
                </div>
            </form>
        </main>
    </MainLayout>
  )
}

export default Listings