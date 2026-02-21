"use client";
import globalApis from "@/app/_Utils/globalApis";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useStore from "@/app/(store)/Store";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";

function SearchProducts({ closMenu }) {
  // ## LOCAL STATE TO STORE ALL PRODUCTS FROM API
  const [product, setProducts] = useState([]);

  // ## ZUSTAND STORE HOOKS FOR SEARCH QUERY AND UPDATER
  const { searchProduct, searchProductItem } = useStore();

  // ## FILTERING LOGIC: SEARCH PRODUCTS BY TITLE
  const filterProduct = product?.filter((item) => {
    return item?.title?.toLowerCase().includes(searchProduct.toLowerCase());
  });

  // ## API CALL: FETCH PRODUCTS LIST ON COMPONENT LOAD
  useEffect(() => {
    globalApis.getProducts().then((res) => {
      setProducts(res?.data?.data || []);
    });
  }, []);

  return (
    /* ## FULL SCREEN BACKDROP OVERLAY */
    <header
      onClick={() => {
        searchProductItem(""); // Clear search on backdrop click
        if (closMenu) closMenu(); // Close modal callback
      }}
      className="fixed inset-0 flex justify-center items-start pt-20 bg-black/50 backdrop-blur-sm transition-opacity px-6 z-[100]"
    >
      {/* ## SEARCH MODAL CONTAINER */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="relative w-full max-w-4xl bg-white shadow-2xl border border-gray-100 overflow-y-auto rounded-xl flex flex-col max-h-[500px]"
      >
        
        {/* ## SEARCH INPUT HEADER (FIXED AT TOP) */}
        <div className="sticky top-0 bg-white z-50 p-4 border-b border-gray-100 flex items-center">
          <BsSearch className="absolute left-8 text-gray-400" />
          <input
            type="text"
            autoFocus
            value={searchProduct}
            placeholder="Search for products..."
            className="w-full pl-12 pr-4 py-2 bg-gray-50 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
            onChange={(e) => searchProductItem(e.target.value)}
          />
        </div>

        {/* ## SEARCH RESULTS AREA */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterProduct?.length > 0 ? (
              filterProduct.map((item, index) => (
                /* ## PRODUCT CARD LINK */
                <Link
                  href={`/product-details/${item.documentId}`}
                  key={index}
                  onClick={() => {
                    searchProductItem(""); // Reset search on item select
                    if (closMenu) closMenu(); // Close modal
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-blue-50/50 rounded-xl transition-all border border-transparent hover:border-blue-100 group"
                >
                  {/* ## PRODUCT IMAGE CONTAINER */}
                  <div className="bg-gray-50 p-2 rounded-lg w-16 h-16 flex-shrink-0">
                    <Image
                    property=""
                      alt={item?.title || "Product"}
                      src={item?.media?.url}
                      width={60}
                      height={60}
                      className="object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* ## PRODUCT DETAILS (TITLE & PRICE) */}
                  <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-gray-800 line-clamp-1">
                      {item?.title}
                    </h2>
                    <p className="text-sm font-semibold text-blue-600 mt-1">
                      ${item?.price}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              /* ## NO RESULTS EMPTY STATE */
              <div className="col-span-full flex flex-col justify-center items-center text-gray-400 py-16">
                <BsSearch size={40} className="mb-4 opacity-20" />
                <h3 className="text-lg">No products match your search</h3>
                <p className="text-sm">Try searching for something else</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default SearchProducts;