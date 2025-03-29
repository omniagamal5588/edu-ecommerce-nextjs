import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({productList}) => {
 console.log('productlist', productList)
  return (
   <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
  {productList ? (
    productList.map((item,index) => {
      
    return  <ProductItem item={item} key={index}/>
})
  ) : (
    <h2>There is no courses yet!</h2>
  )}
</div>

  )
}

export default ProductList

