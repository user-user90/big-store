import Image from "next/image"
import Skeleton from "./Skeleton"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import useStore from "@/app/(store)/Store"
import globalApis from "@/app/_Utils/globalApis"
import toast from "react-hot-toast"


function ProductsInfo({product}) {
  // ## Image
  //  ## ADD CART ZUSTAND
  const addToCart=useStore((state)=>state.addToCart)
  // ## isLoggend
  const {user,isSignedIn}=useUser()
  // ## USE ROUTER
  const router = useRouter()
  // ## function add cart
  const handelAddCart=()=>{
    if(!isSignedIn){
      router.push("/sign-in")
    }else{
      toast.success("Product added to cart! 🛒", {
        className: "bg-green-600 text-white font-medium shadow-lg",
      style:{
        background:"green",
        color:"white"
      }
      })
       const paload={
        data:{
          email:user.primaryEmailAddress?.emailAddress,
          username:user?.fullName,
          allproducts:[product?.documentId]
        }
       }
     globalApis.cartUser(paload).then((res)=>{
       
      addToCart({
        ...product,
        documentId:res?.data?.data?.documentId
      })
     })
    }
  }
  return (
    <section className="">
      <div className="flex flex-col md:justify-end md:items-center border border-gray-300 shadow-md mx-4 md:mx-8 lg:mx-10">
    <div className="grid grid-cols-1 md:grid-cols-2   ">
      {/* ## IMAGE */}
       <div className="my-0 md:my-4">
        {product?.media?.url?(
          <Image
        src={product?.media?.url}
        alt={product?.title || "Product"}
        width={600}
        height={400}
        quality={100}
         className="object-cover"
        />
        ):
        // ## SKELETON 
         (<div className="flex items-center justify-center w-full  md:w-[600px] h-[500px] bg-gray-200 rounded-2xl animate-pulse content-center text-center  ">
          <span className="border-2 border-blue-700 border-t-transparent w-7 h-7 rounded-full animate-spin "></span>
         </div>)
        }
       </div>
       {/* ## TITLE && PRICE && DESCRIPTION */}
        {product ? (
              <div className="mt-5 md:mt-26 pb-9 mx-6 md:mx-">
        <div className="border-b border-gray-300 ">
           <h2 className="text-5xl md:text-6xl text-gray-800 font-semibold leading-tight max-w-[15ch]  mb-4">{product?.title}</h2>
            {/* #PRICE */}
           <h3 className="bg-blue-600 font-bold text-white py-1 px-3 rounded-full w-fit mb-6 ">${product?.price} USD</h3>
           </div>
             {/* ## description */}
<div className="my-6 space-y-3"> {/* أضفنا space-y لعمل مسافة بين الفقرات */}
  {product?.description?.map((block, index) => (
    <div key={index}>
      {block?.children?.map((child, id) => (
        <p key={id} className="text-gray-600 font-medium   leading-relaxed mx-2.5">
          {child?.text}
        </p>
      ))}
    </div>
  ))}
</div>
             {/* ## button add cart */}
             <button onClick={handelAddCart}
              className="bg-blue-600 text-white hover:bg-blue-800 active:scale-95 cursor-pointer transition-all duration-300 py-3 rounded-full w-full md:w-md   md:mb-0">Add To Cart</button>
       </div>
        ):(
          <div className="ml-0 md:ml-19">
            <Skeleton/>
          </div>
        )}
    </div>
    </div>
    </section>
  )
}

export default ProductsInfo