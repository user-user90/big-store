import globalApis from "@/app/_Utils/globalApis";
import Link from "next/link";
import SliderProductVesionMobil from "./SliderProductVesionMobil";

async function SliderProducts() {
  let sliderProduct = [];

  try {
    const res = await globalApis.getSliderProduct();
    sliderProduct = res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching slider products:", error);
  }

  return (
    <div className=" mx-6">

      {/* 🔹 DESKTOP VERSION */}
      <div className="hidden md:block space-y-3">
        <h2 className="text-sm text-gray-500  tracking-wide">
          Collections
        </h2>

        <div className="flex flex-col gap-2">
          <Link
            href="/search"
            className="text-sm text-gray-700 hover:text-black hover:underline transition"
          >
            All
          </Link>
          {sliderProduct.length > 0 ? (
            sliderProduct?.map((item) => (
            <Link
              key={item?.documentId}
              href={`/search/${item?.slug}`}
              className="text-sm text-gray-700 hover:text-black hover:underline transition"
            >
              {item?.title}
            </Link>
          ))
          ):(
            <div>
              <span className="animate-pulse text-sm">Loading...</span>
            </div>
          )}
          
        </div>
      </div>

      {/* 🔹 MOBILE VERSION */}
         <div>
            <SliderProductVesionMobil product={sliderProduct} />
         </div>
    </div>
  );
}

export default SliderProducts;
