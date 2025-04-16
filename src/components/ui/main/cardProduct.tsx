import Image from 'next/image'
import React from 'react'
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiHeart } from "react-icons/bi";
export type PruductType = {
  product:{
    name:string ,
    image:string ,
    id:number ,
    price:number ,
    discount : string,
    memory : string,
    brand : string
  }


}
export default function Product({product}:PruductType) {
  const truncateString = (str:string) => {
    return str.length > 20 ? str.slice(0, 20) + "..." : str;
  };
 
 
  return (
    <div className=' w-[300px] lg:w-[260px] h-[18rem] lg:h-[19rem] bg-white rounded-lg text-center  ' >
        <BiHeart  size={25} className='m-1 text-[#ADC6FF]  cursor-pointer ml-0 '/>

      <div className='img ' >
        <div className="flex justify-center items-center"> <Image  src={product?.image} alt='product' width={100} height={100} className='text-center  w-56 h-40 object-contain' /></div>
       
      </div>
      <div className='title flex justify-between items-center p-1 mt-1' >
        <MdOutlineReportGmailerrorred size={20} className='text-neutral-600 cursor-pointer' />
        <span className='text-lg cursor-text'> {truncateString(product?.name )}</span>

      </div>
    <div className='flex justify-between items-end mx-2 '>
   

        <div className='price flex flex-col gap-2 cursor-text'>
          <h2>{product?.price}</h2>
          <div className='flex  '>
            <span className='text-[#FF7A45] bg-[#FFD8BF] text-xs w-10 rounded-md ml-1' >{`${product?.discount}%`}</span>
            <span className='line-through text-xs text-neutral-600  ' >{product?.price}</span>
          </div>

      </div>
      <div className='shop w-[35px] h-[35px]  bg-cyan-600 rounded-lg flex justify-center cursor-pointer items-center'>
        <LuShoppingCart className='text-white'  size={20}/>
        </div>
    </div>
      <h2>
        
      </h2>
      
    </div>
  )
}


