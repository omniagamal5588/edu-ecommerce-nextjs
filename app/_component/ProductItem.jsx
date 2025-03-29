import React from 'react'
import {List} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
const ProductItem = ({item}) => {
	
  return (
   
      <Link href={`/product-details/${item?.documentId}`} className='p-1 border-teal-400 rounded-lg hover:border hover:shadow-md hover:cursor-pointer'>
			<Image src={item?.banner?.url}
			alt='banner-card'
			width={400}
			height={350}
			className='rounded-t-lg h-[170px] object-cover'
			/>
		<div className='flex items-center justify-between p-5 rounded-b-lg bg-gray-200'>
		<div className=''>
				<h2 className='text-[12px] font-medium line-clamp-1'>{item?.name}</h2>
				<h2 className='text-[10px] text-gray-600 flex  gap-1 items-center'>
				<List className='w-4 h-4' /> {item?.category}</h2>
			</div>
			<h2>{item?.price}$</h2>
		</div>
		</Link>
   
  )
}

export default ProductItem
