"use client";
import globalApis from "@/app/_Utils/globalApis";
import React, { useEffect, useState } from "react";
import ProductsInfo from "./ProductsInfo";
import CategoryProducts from "./CategoryProducts";

function ProductsDetails({ documentId }) {
  // ## STATE ##
  const [productId, setProductId] = useState(null);
  const [productCategory, setProductCategory] = useState([]);
  // ## CATEGORY PRODUCT
  const getProductCategory = (product) => {
    globalApis.getProductByCategory(product?.category).then((res) => {
      setProductCategory(res?.data?.data || []);
    });
  };
  // ## GET PRODUCT BY ID
  const getProductId = () => {
    globalApis.getProductById(documentId).then((res) => {
      setProductId(res?.data?.data);
      getProductCategory(res?.data?.data);
    });
  };

  // ## USE EFFECT
  useEffect(() => {
    getProductId();
  }, [documentId]);
  return (
    <div className="">
      {/* ## PRODUCT INFO */}
      <div className="mb-16">
        <ProductsInfo product={productId} />
      </div>
      {/* ## PRODUCT CATEGORY */}
      <div>
        <CategoryProducts product={productCategory} />
      </div>
    </div>
  );
}

export default ProductsDetails;
