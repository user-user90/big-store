import React from 'react'

function Skeleton() {
  return (
    <div className=' my-6 md:mt-26 mx-6 md:mx-0 space-y-5  '>
        <h2 className='bg-gray-300 animate-pulse w-full md:w-[450px] h-[40px] rounded-2xl '></h2>
        <h3 className='bg-gray-300 animate-pulse w-full md:w-[100px] h-[40px] rounded-2xl'></h3>
        <p className='bg-gray-300 animate-pulse w-full md:w-[450px] h-[30px] rounded-2xl '></p>
        <p className='bg-gray-300 animate-pulse w-full md:w-[450px] h-[30px] rounded-2xl '></p>
        <p className='bg-gray-300 animate-pulse w-full md:w-[450px] h-[30px] rounded-2xl '></p>
        <p className='bg-gray-300 animate-pulse w-full md:w-[450px] h-[30px] rounded-2xl '></p>
        <h4 className='bg-gray-300 animate-pulse w-full md:w-[500px] h-[40px] rounded-2xl '></h4>


    </div>
  )
}

export default Skeleton