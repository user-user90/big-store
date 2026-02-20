"use client";

import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa6";




function SliderProductVesionMobil({ product }) {
  const router = useRouter();

  return (
    <aside className="block md:hidden px-4 my-4">
      <div className="relative">
        <select
          onChange={(e) => router.push(e.target.value)}
          className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg p-3 outline-none appearance-none focus:border-black transition-all"
          defaultValue=""
        >
          {/* الخيار الافتراضي */}
          <option value="/search">All Categories</option>

          {/* التحقق من البيانات بشكل صحيح */}
          {product?.length > 0 ? (
            product.map((item) => (
              <option
                key={item?.documentId}
                value={`/search/${item?.slug}`}
              >
                {item?.title}
              </option>
            ))
          ) : (
            // لا يمكن وضع Skeleton (div) هنا، لذا نضع خياراً نصياً
            <option disabled>Loading...</option>
          )}
        </select>
        
        {/* أيقونة سهم صغيرة لتبدو احترافية (Vercel Style) */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <span > <FaAngleDown  className=" text-sm text-gray-600" /></span>

        </div>
      </div>
    </aside>
  );
}

export default SliderProductVesionMobil;