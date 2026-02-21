import axios from "axios";

const basUrl ="https://devoted-sparkle-117ce00640.strapiapp.com";
const ApiKey = process.env.NEXT_PUBLIC_API_KEY;

const axiosClient = axios.create({
  baseURL: basUrl,
  headers: {
    Authorization: `Bearer${ApiKey}`,
  },
});
//    ## Get NavBar ##
const getNavbar = async () => await axiosClient.get("/api/navbars");
//   ##  GET HERO SECTION ##
const getHeroSection = async () => await axiosClient.get("/api/products?populate=*");
// ## GET ALL PRODUCTS ##
const getProducts = async () => 
  await axiosClient.get("/api/allproducts?sort[0]=createdAt:desc&populate=*");
// ## GET FOOTER 1 ##
const getFooter = async () => await axiosClient.get("/api/footers");
// ## GET PRODUCT BY ID ##
const getProductById = async (documentId) =>
  await axiosClient.get(`/api/allproducts/${documentId}?populate=*`);
// ## GET PRODUCT BY CATEGORY
const getProductByCategory = async (category) =>
  await axiosClient.get(
    `/api/allproducts?filters[category][$eq]=${category}&populate=*`)
  // ## CARTE
  const cartUser=async(data)=>await axiosClient.post("/api/cartes",data)
  // ## get USER ITEM
  const getUserItem=async(email)=>await axiosClient.get(`/api/cartes?populate[allproducts][populate][0]=media&filters[email][$eq]=${email}`)
  // ## DELETE ITEM USER CART ##
  const deleteItemCart=async(documentId)=>await axiosClient.delete(`/api/cartes/${documentId}`)
  // ## GET SLIDER PRODUCTS SEARCH ## 
  const getSliderProduct=async()=>await axiosClient.get("/api/sliderproducts?populate=*")
    // ## GET FOOTER DETAILS ## 
  const getFooterDetails=async (category) =>
  await axiosClient.get(`/api/fotterdetails?filters[category][$eq]=${category}&populate=*`)



// ## GLOBALAPIS ##
const globalApis = {
  // ## getNavbar
  getNavbar,
  //   ##  GET HERO SECTION ##
  getHeroSection,
  // ## GET ALL PRODUCTS ##
  getProducts,
  // ## GET FOOTER 1 ##
  getFooter,
  // ## GET PRODUCT BY ID ##
  getProductById,
  // ## GET PRODUCT BY CATEGORY
  getProductByCategory,
  //## CARTE USER 
  cartUser,
  // ## get USER ITEM
  getUserItem,
    // ## DELETE ITEM USER CART ##
  deleteItemCart,
    // ## GET SLIDER PRODUCTS SEARCH ## 
   getSliderProduct,
    // ## GET FOOTER DETAILS ## 
    getFooterDetails
};

export default globalApis;
