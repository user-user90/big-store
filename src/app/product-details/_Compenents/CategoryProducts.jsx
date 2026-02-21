"use client"
import Image from "next/image"
import Link from "next/link"
import globalApis from "@/app/_Utils/globalApis"
import { useEffect, useState } from "react"


function CategoryProducts({ product }) {
  const [products, setProducts] = useState([])

  const getAllProducts_ = () => {
    globalApis.getProducts().then((res) => {
      setProducts(res?.data?.data || [])
    })
  }

  useEffect(() => {
    // إصلاح: استخدام if صريحة لضمان تحديث الـ State بشكل صحيح
    if (product && product.length > 0) {
      setProducts(product)
    } else {
      getAllProducts_()
    }
  }, [product])

  return (
    <section>
      <div className='flex gap-4 overflow-x-auto md:px-6 mb-10'>
        {products?.length > 0 ? (
          products?.map((item) => (
            <Link 
              href={item?.documentId}
              key={item?.documentId} 
              className='relative bg-white min-w-[350px] md:min-w-[450px] h-[200px] border border-gray-300 hover:border-blue-700 transition-all duration-300 rounded-lg overflow-hidden shadow-sm'
            >
              {/* ## IMAGE */}
              <div className='relative w-full h-full'>
                {/* حماية رابط الصورة لضمان عدم حدوث Invalid URL */}
                {item?.media?.url ? (
                  <Image
                    alt={item?.title || "Product"}
                    src={item?.media?.url}
                    fill
                    className='object-contain hover:scale-105 transition-all duration-300'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-100 flex items-center justify-center'>No Image</div>
                )}
              </div>

              {/* ## TITLE & PRICE */}
              <div className='flex items-center absolute bottom-4 left-7 gap-2 border border-gray-300 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3'>
                <h2 className='text-sm font-medium'>{item?.title}</h2>
                <h3 className='font-bold text-xs text-gray-500'>{item?.category}</h3>
                <h3 className='bg-blue-700 text-xs rounded-full text-white px-2 py-1 '>
                  ${item?.price} USD
                </h3>
              </div>
            </Link>
          ))
        ) : (
          /* SKELETON LOADING */
          [1, 2, 3, 4].map((id) => (
            <div key={id} className='bg-gray-200 min-w-[350px] md:min-w-[450px] h-[200px] border border-gray-200 animate-pulse rounded-lg'></div>
          ))
        )}
      </div>
    </section>
  )
}

export default CategoryProducts
