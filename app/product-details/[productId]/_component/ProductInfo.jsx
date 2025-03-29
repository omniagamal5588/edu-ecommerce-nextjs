'use client'
import React, { useContext } from 'react'
import { ShoppingCart, BadgeCheck, AlertOctagon } from 'lucide-react'
import SkeletonProductInfo from './SkeletonProductInfo'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApi from '../../../_utils/CartApi'
import { CartContext } from '../../../_context/CartContext'


const ProductInfo = ({product}) => {
	console.log('product',product)
	const {user} = useUser();
	const router = useRouter();
	const{cart,setCart}= useContext(CartContext)
	
	const handleAddToCart =()=>{
		if(!user){
			router.push('/sign-in')
		}else{
			const data = {
				data: {
					username: user.fullName,
					email: user.primaryEmailAddress.emailAddress,
					products: [product?.documentId]
				}
			}
			CartApi.addToCart(data).then(res=>{
				console.log('cart created successfully', res.data.data)
				setCart(oldCart => [
					...oldCart,
					{
						cartId: res?.data?.data?.documentId,
						product
					}
				])
			}).catch(error => {
				console.log('error', error)
			})

		}
	}
	console.log('cart data', cart)

////////////////////////


	//////////////////
	
	
  return (
  <div>
	{
		product?.documentId?	<div>
					<h2 className='text-[20px]'>{product?.name}</h2>
					<h2 className='text-[15px] text-gray-400'>{product?.category}</h2>
					<h2 className='text-[11px] mt-2'>{product?.description}</h2>
					<h2 className='text-[11px] text-gray-500 flex gap-2 mt-2 items-center'>{product?.instantDelivary?<BadgeCheck className='w-5 h-5 text-green-500' /> : <AlertOctagon />} Eligible For Instant Delivery</h2>
					<h2 className='text-[24px] text-primary mt-2'>$ {product?.price}</h2>

					<button onClick={handleAddToCart} className='flex gap-2 p-3 text-white rounded-lg bg-primary hover:bg-teal-600'><ShoppingCart /> Add To Cart</button>
				</div>
				: <SkeletonProductInfo/>
	}
			
			
				
				
			

		</div>
  )
}

export default ProductInfo
