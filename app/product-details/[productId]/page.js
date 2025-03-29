"use client";
import BreadCrumb from "../../_component/BreadCrumb";
import ProductApis from "../../_utils/ProductApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "./_component/ProductBanner";
import ProductInfo from "./_component/ProductInfo";
import ProductList from "../../_component/ProductList";
import { usePathname } from "next/navigation";





function ProductDetails({ params }) {
  const path = usePathname();
  console.log('path',path)
  const[ProductDetails,setProductDetails]=useState({})
  const [productList,setProductList] = useState([]) 
 
  useEffect(() => {
    getProductById_();
  }, [params?.productId]);
  const getProductById_ = () => {
    ProductApis.getProductById(params?.productId).then((res) => {
      console.log("product item data ",res.data.data);
      setProductDetails(res.data.data)
      getProductListByCategory(res.data.data)
    });
  };

  //get product by category
  const getProductListByCategory =(product)=>{
    ProductApis.getProductByCategory(product?.category).then(res=>{
      console.log('product list' , res.data.data)
      setProductList(res.data.data)
    }
    )
  }
  
  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} product={ProductDetails}/>
    <div className="grid justify-around grid-cols-1 gap-5 mt-10 sm:gap-0 sm:grid-cols-2">
        <ProductBanner product={ProductDetails}/>
      <ProductInfo product={ProductDetails}/>
    </div>
    <div>
      <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
        <ProductList productList={productList}/>
    </div>
    </div>
  );
}

export default ProductDetails;