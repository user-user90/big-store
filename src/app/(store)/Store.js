 import { create } from "zustand";

 const useStore=create((set)=>({
    cart:[],
    setCart:(productList)=>set({cart:productList}),
    // ## add to cart
    addToCart:(product)=>set((state)=>({
        cart:[...state.cart,product]
    })),
    // ## delete items
    deleteCarteItem:(id)=>set((state)=>({
        cart:state.cart.filter((item)=>item.documentId !== id)
    })),
    // ## SEARCH PRODUCT
    searchProduct:"",
    searchProductItem:(search)=>set({searchProduct:search})
 }))

 export default useStore