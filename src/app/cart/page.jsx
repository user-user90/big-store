import React from 'react'

function page() {
  return (
    <div className=' flex justify-center items-center h-[80vh]'>
    <div className='flex items-center gap-2'>
      <h2 className='border-2 border-blue-500 border-t-transparent w-6 h-6  rounded-full animate-spin'></h2>
      <span  className='text-2xl text-gray-600'>Please Wait...</span>
    </div>
</div>
  )
}

export default page