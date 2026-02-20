import Products from '@/app/_Compenents/_Products/Products'
import globalApis from '@/app/_Utils/globalApis'
import React from 'react'
import AllProducts from '../_Compenents/AllProducts'

async function HomePage({params}) {
  const resolveParams = await params
  const slug = resolveParams.slug
 const upperCase = slug?.toUpperCase()
   let sliderCaetegory=[]
  const res = await globalApis.getProductByCategory(upperCase)
  sliderCaetegory=res?.data?.data 
  return (
    <div className='flex justify-center items-center mx-auto md:mr-24'>
      {sliderCaetegory ? 
      <AllProducts product={sliderCaetegory} />
      :
      <div>hello</div>
      }
    </div>
  )
}

export default HomePage