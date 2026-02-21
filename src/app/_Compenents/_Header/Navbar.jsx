"use client";
import globalApis from "@/app/_Utils/globalApis";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { UserButton, useUser } from "@clerk/nextjs";
import { CiShoppingCart } from "react-icons/ci";
import useStore from "@/app/(store)/Store";
import CartUserItems from "./CartUserItems";
import SearchProducts from "./SearchProducts";

function Navbar(onClose) {
  // ## UI STATE MANAGEMENT
  const [openSearch, setOpenSearch] = useState(false);
  const [closCart, setClosCart] = useState(true);
  const [opentNavbar, setOpenNavbar] = useState(false);

  // ## ZUSTAND STORE STATE MANAGEMENT
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);

  // ## CLERK AUTHENTICATION HOOK
  const { isSignedIn, user } = useUser();

  // ## NAVBAR LINKS STATE
  const [navBarLink, setNavBarLink] = useState([]);

  // ## FETCH USER CART ITEMS FROM API
  const getUserItem_ = () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return null;
    
    globalApis.getUserItem(email).then((res) => {
      const carts = res?.data?.data;
      const products = carts?.flatMap((item) => {
        return (item?.allproducts || []).map((product) => ({
          ...product,
          documentId: item.documentId,
        }));
      });
      setCart(products || []);
    });
  };

  // ## EFFECT: FETCH CART ON USER LOGIN
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) getUserItem_();
  }, [user?.primaryEmailAddress?.emailAddress]);

  // ## EFFECT: FETCH NAVIGATION LINKS ON MOUNT
  useEffect(() => {
    globalApis.getNavbar().then((res) => setNavBarLink(res?.data?.data));
  }, []);

  return (
    <section className="relative">
      {/* ## NAVIGATION BAR CONTAINER */}
      <nav className="flex items-center justify-between mx-4 md:mx-10 py-5">
        
        {/* ## LEFT SECTION: MOBILE MENU & LOGO & DESKTOP LINKS */}
        <div className="flex gap-8 items-center">
          {/* ## MOBILE MENU TOGGLE ICON */}
          <h2
            className="md:hidden p-2 border border-gray-200 rounded-md cursor-pointer"
            onClick={() => setOpenNavbar(!opentNavbar)}
          >
            <IoMenuOutline size={20} />
          </h2>

          {/* ## BRAND LOGO */}
          <Link href={"/"} className="font-black text-xl tracking-tighter">
            BIGSTORE
          </Link>

          {/* ## DESKTOP NAVIGATION LINKS */}
          <ul className="hidden md:flex gap-6">
            <li>
              <Link href={"/search"} className="text-sm hover:border-b text-gray-500 hover:text-black transition-colors">
                All
              </Link>
            </li>
            {navBarLink?.map((link, index) => (
              <li key={index}>
                <Link href={`/search/${link?.slug}`} className="text-sm text-gray-500 hover:text-black hover:border-b transition-colors">
                  {link?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ## RIGHT SECTION: SEARCH & CART & USER PROFILE */}
        <div className="flex items-center gap-3">
          
          {/* ## SEARCH ACTION BUTTON */}
          <button 
          aria-label="search Product"
            onClick={() => setOpenSearch(true)}
            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all"
          >
            <CiSearch size={24} />
          </button>

      

          {/* ## USER AUTHENTICATION ACTIONS */}
          {!isSignedIn ? (
            <Link href={"/sign-in"} className="text-gray-600 hover:text-black">
              <FaUserAlt size={18} />
            </Link>
          ) : (
            // ## Button User && Cart shop
            <div className="flex items-center gap-2">
            
                {/* ## SHOPPING CART DROPDOWN SECTION */}
          <div className="relative">
            <div 
              onClick={() => setClosCart(!closCart)} 
              className="p-2 border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50 transition-all"
            >
              <CiShoppingCart size={22} />
              {/* ## CART ITEM COUNTER BADGE */}
              {cart?.length > 0 && (
                <span className="absolute -top-2 right-6 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart?.length}
                </span>
              )}
            </div>
            {/* ## CART ITEMS LIST COMPONENT */}
            {!closCart && <div className="">
              <CartUserItems onClose={()=>setClosCart(!closCart)} />
            </div> }
          </div>
          {/* ### USER  BUTTON  */}
          <UserButton  />
            </div>
          )}
        </div>
      </nav>

      {/* ## GLOBAL SEARCH OVERLAY MODAL */}
      {openSearch && (
        <div className="z-50">
          <SearchProducts closMenu={() => setOpenSearch(!openSearch)} />
        </div>
        
      )}

      {/* ## MOBILE NAVIGATION SIDEBAR OVERLAY */}
      {opentNavbar && (
        <div className="fixed inset-0 z-50 bg-white p-6 animate-in slide-in-from-left duration-300">
          {/* ## CLOSE MOBILE MENU BUTTON */}
          <button aria-label="Clos Icon Menu" onClick={() => setOpenNavbar(false)} className="text-gray-800 text-xl border border-gray-400 bg-transparent rounded-sm px-3 mt-2 my-6">X</button>
          
          {/* ## MOBILE NAVIGATION LINKS LIST */}
          <ul className="flex flex-col gap-6 text-xl text-gray-700 ">
             <li onClick={() => setOpenNavbar(false)}>
               <Link href="/search" className="hover:border-b hover:text-black ">All</Link>
             </li>
             {navBarLink?.map((link, index) => (
               <li key={index} onClick={() => setOpenNavbar(false)}>
                 <Link href={`/search/${link?.slug}`} className="hover:border-b hover:text-black ">{link?.title}</Link>
               </li>
             ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Navbar;