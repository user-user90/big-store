"use client";
import globalApis from "@/app/_Utils/globalApis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "@/app/(store)/Store";

function AllProducts({ product }) {
  const [products, setProducts] = useState(product || []);
  const { searchProduct } = useStore();

  useEffect(() => {
    if (!product || product.length === 0) {
      globalApis.getProducts().then((res) => {
        setProducts(res?.data?.data || []);
      });
    }
  }, [product]);

  const filteredProducts = products.filter((item) =>
    item?.title?.toLowerCase().includes(searchProduct.toLowerCase()),
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((item, index) => (
            <Link
              href={`/product-details/${item.documentId}`}
              key={item.documentId || index}
              className="group relative flex flex-col border border-gray-300 rounded-3xl overflow-hidden hover:border hover:border-blue-700 transition-all duration-300 bg-white"
            >
              {/* حاوية الصورة مع خلفية فاتحة */}
              <div className="bg-[#f9f9f9]  flex items-center justify-center p-10 overflow-hidden">
               {item?.media?.url ? 
                <Image
                  src={item?.media?.url}
                  alt={item?.title || "product"}
                  width={350}
                  height={350}
                  className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
               :
               <span className="flex items-center justify-center rounded-md animate-pulse  w-[400px] h-[300px] ">
                Loading...
               </span>
               }
              </div>

              {/* تفاصيل المنتج العائمة - تم تحسينها لتكون Full Width تقريباً */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-lg border border-white/20 p-2 pl-4 rounded-2xl flex justify-between items-center shadow-lg ring-1 ring-black/5">
                <div className="flex flex-col overflow-hidden mr-2">
                  <h2 className="font-bold text-gray-900 text-sm md:text-base truncate tracking-tight">
                    {item?.title}
                  </h2>
                </div>

                {/* السعر بشكل مميز */}
                <div className="bg-blue-600 text-white px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap shadow-md shadow-blue-200">
                  ${item?.price}{" "}
                  <span className="text-[10px] opacity-80">USD</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
         <div className="flex h-[80vh]  gap-2">
          <h2 className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></h2>
          <p className="text-gray-600 animate-pulse">Loading...</p>
         </div>
        )}
      </div>
    </section>
  );
}

export default AllProducts;
