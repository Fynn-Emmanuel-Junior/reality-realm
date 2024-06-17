
const ListingSkeleton = () => {
  return (
    <div className='w-11/12 mx-auto mt-5'>
        <div className='w-11/12 md:w-[40%] flex flex-col items-center'>
            <div className="w-full  h-8 animate-pulse bg-stone-200 rounded-md my-5"/>	
        </div>

        <div className='md:flex md:items-center md:justify-center md:gap-3 animate-pulse'>
            <div className='w-full md:w-7/12 h-44 bg-stone-200 animate-pulse  rounded-lg md:rounded-l-lg' />
            <div className='hidden md:w-5/12 md:h-44 md:grid md:grid-cols-2 md:gap-2 animate-pulse'>
                <div className='bg-stone-200 rounded-l-lg h-20'/>
                <div className='bg-stone-200 rounded-l-lg h-20'/>
                <div className='bg-stone-200 rounded-l-lg h-20'/>
                <div className='bg-stone-200 rounded-l-lg h-20'/>
            </div>
        </div>
{/* small screen skeleton loader */}

        <div className='flex flex-col items-center md:hidden mt-5'>
        <div className='bg-stone-200 animate-pulse w-full h-10 rounded-md mt-3'/>
        <div className='bg-stone-200 animate-pulse w-full h-10 rounded-md mt-3'/>
        <div className='bg-stone-200 animate-pulse w-full h-60 rounded-md mt-3'/>

        <div className='bg-stone-200 animate-pulse w-full h-10 rounded-md mt-8'/>
        <div className='bg-stone-200 animate-pulse w-full h-10 rounded-md mt-3'/>
        <div className='bg-stone-200 animate-pulse w-full h-60 rounded-md mt-3'/>

        <div className='bg-stone-200 animate-pulse w-full h-10 rounded-md mt-8'/>
        <div className='bg-stone-200 animate-pulse w-full h-10 rounded-md mt-3'/>
        <div className='bg-stone-200 animate-pulse w-full h-60 rounded-md mt-3'/>
        </div>

        <div className='hidden md:flex md:justify-center md:gap-5 mt-3'>
        <div className='w-full'>
            <div className='animate-pulse w-full border-black border-b-[1px] border-opacity-20 h-20'>
                <div className='bg-stone-200 rounded-sm w-80 h-7'/>
                <div className='bg-stone-200 rounded-sm w-64 h-7 mt-2'/>
            </div>
            <div className='animate-pulse w-full border-black border-b-[1px] border-opacity-20 h-20 mt-5'>
                <div className='bg-stone-200 rounded-sm w-80 h-7'/>
                <div className='bg-stone-200 rounded-sm w-64 h-7 mt-2 '/>
            </div>
            <div className='animate-pulse w-full border-black border-b-[1px] border-opacity-20 h-20 mt-5'>
                <div className='bg-stone-200 rounded-sm w-80 h-7'/>
                <div className='bg-stone-200 rounded-sm w-64 h-7 mt-2 '/>
            </div>
            <div className='animate-pulse w-full border-black border-b-[1px] border-opacity-20 h-20 mt-5'>
                <div className='bg-stone-200 rounded-sm w-80 h-7'/>
                <div className='bg-stone-200 rounded-sm w-64 h-7 mt-2 '/>
            </div>
            <div className='animate-pulse w-full border-black border-b-[1px] border-opacity-20 h-20 mt-5'>
                <div className='bg-stone-200 rounded-sm w-80 h-7'/>
                <div className='bg-stone-200 rounded-sm w-64 h-7 mt-2 '/>
            </div>
        </div>
        
        <div>
            <div className='animate-pulse bg-stone-200 w-60 h-60 rounded-lg' />
            <div className='animate-pulse bg-stone-200 w-60 h-60 rounded-lg mt-20' />
        </div>

        </div>

    </div>
  )
}

export default ListingSkeleton
