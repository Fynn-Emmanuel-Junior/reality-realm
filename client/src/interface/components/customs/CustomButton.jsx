import React from 'react'

const CustomButton = ({text}) => {
  return (
    <button  className='bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 p-3'>
        {text}
    </button>
  )
}

export default CustomButton