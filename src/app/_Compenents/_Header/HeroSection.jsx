import globalApis from "@/app/_Utils/globalApis";
import Image from "next/image";
import Link from "next/link";

async function HeroSection() {
  let heroProduct = [];
  try {
    const res = await globalApis.getProducts(); // تأكد أن هذه الدالة تجلب 3 منتجات على الأقل
    heroProduct = res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching hero section:", error);
  }

  return (
    <section className="pb-5">
      <div className="mx-6 grid grid-cols- md:grid-cols-3 auto-rows-[130px] md:auto-rows-[200px] gap-4">
        {heroProduct?.length > 0 ? (
          // تم حذف الـ <div> الزائد هنا ليعمل الـ Grid بشكل صحيح
          heroProduct.slice(0, 3).map((item, index) => (
            <Link
              href={`/product-details/${item?.documentId}`}
              key={item?.documentId}
              className={`group relative overflow-hidden border border-gray-300 bg-white rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-blue-500 ${
                index === 0
                  ? "row-span-2 col-span-1 md:col-span-2" // المربع الكبير
                  : "row-span-2 col-span-1 md:row-span-1 md: md:col-span-1" // المربعات الصغيرة
              }`}
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full h-full p-8 md:p-12">
               {item?.media?.url ?
                <Image
                  alt={item?.title || "product"}
                  src={item?.media?.url}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                  sizes={index === 0 ? "60vw" : "25vw"}
                  priority={index === 0}
                  quality={100}
                />
                :
                  <div className="flex items-center justify-center gap-2 h-[50vh]">
                    <h2 className="border border-blue-800 border-t-transparent animate-spin w-4 h-4 rounded-full"></h2>
                    <span>Londing...</span>
                  </div>
                }
              </div>

              {/* TITLE & PRICE BADGE */}
              <div
                className={`absolute z-20 ${
                  index === 0 ? "bottom-4 left-4" : "bottom-3 left-3"
                }`}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 p-1 text-[10px] md:text-xs font-bold text-black backdrop-blur-md shadow-sm">
                  <h2 className="line-clamp-1 pl-3">{item?.title}</h2>
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-white whitespace-nowrap">
                    ${item?.price} USD
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // SKELETON LOADING
          [1, 2, 3].map((item, index) => (
            <div
              key={index}
              className={`bg-gray-200 animate-pulse rounded-3xl border border-gray-400  ${
                index === 0
                  ? "row-span-2 col-span-1 md:col-span-2"
                  : "row-span-1 col-span-1"
              }`}
            ></div>
          ))
        )}
      </div>
    </section>
  );
}

export default HeroSection;