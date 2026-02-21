"use client";
import useStore from "@/app/(store)/Store";
import React, { useState } from "react";
import Image from "next/image";
import globalApis from "@/app/_Utils/globalApis";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri"; // أضفت أيقونة للحذف لشكل احترافي
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function CartUserItems({ onClose }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const deleteCarteItem = useStore((state) => state.deleteCarteItem);
  const cart = useStore((state) => state.cart);

  const handelDeleteCartItem = async (documentId) => {
       toast.success("Product Deleted ",{
        style:{
          background:"red",
          color:"white"
        },
        iconTheme:{
          primary:"red"
        }
       })
      deleteCarteItem(documentId);
      try {
        await globalApis.deleteItemCart(documentId);
      } catch (error) {
        console.error(" error deleted cart", error);
      }
    
  };

  return (
    <header
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-screen w-full max-w-md bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-500"
      >
        {/* ## TOP CARTs */}
        <div className="flex justify-between items-center px-6 pt-10 pb-4 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl text-gray-800">My Cart</h2>
            <span className=" text-blue-600 px-2 py-0.5 rounded-full text-xs border border-gray-300 font-bold">
              {cart?.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600  transition-colors text-2xl font-light"
          >
            ✕
          </button>
        </div>

        {/* ## CART CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {cart?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[70vh] px-10 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                onClick={onClose}
                href={"/search"}
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-md"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {cart?.map((item) => (
                <div
                  key={item?.documentId}
                  className="flex justify-between items-center gap-4 group"
                >
                  <div className="flex gap-4 items-center">
                    {/* ## IMAGE ## */}
                    <div className="border border-gray-300 bg-transparent p-1 shadow-sm rounded-lg overflow-hidden w-20 h-20 flex-shrink-0">
                      <Image
                        src={item?.media?.url}
                        alt={item?.title || "product"}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* ## INFO TITLE && PRICE */}
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-bold text-gray-800 line-clamp-1">
                        {item?.title}
                      </h2>
                      <h3 className="text-sm font-extrabold text-blue-600">
                        ${item?.price}
                      </h3>
                    </div>
                  </div>
                  {/* ## DELETE ITEM */}
                  <button
                    onClick={() => handelDeleteCartItem(item?.documentId)}
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 cursor-pointer  "
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ## FOOTER (Optional placeholder for Total) */}
        {cart?.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            {/* ## FOOTER */}
            {cart?.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <button onClick={()=>{
                setIsProcessing(true)
                setTimeout(()=>{
                  router.push("/cart")
                  onClose()
                },4000)
              }} className={`flex items-center justify-center text-sm gap-2 py-3 rounded-2xl text-white font-bold w-full ${isProcessing?"bg-blue-600":"bg-blue-800"}`}>
                {isProcessing?(
                  <>
                  <h2 className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></h2>
                  <span>wait a moment..</span>
                  </>
                ):('Proceed to Checkout')}
              </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default CartUserItems;
