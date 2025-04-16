'use client'
import ProdutsSection from '@/components/ui/main/produtsSection'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { usePopularProducts } from '@/api/popularProducts/popularProductsHook'
function PopularProducts() {
  const { data, isLoading, isError } = usePopularProducts()

  // const dummyProducts = [
  //   {id : 1 , name: 'Iphone 15 pro max', price: 989850, image: '/assets/iphones.png', brand: 'Apple', memory: '512GB'  , discount : "10" },
  //   {id : 2 , name: 'Galaxy S24+', price: 989910, oldPrice: 999910, image: '/assets/phone1.png', brand: 'Samsung', memory: '256GB' , discount : "10" },
  //   {id : 3 , name: 'Galaxy Note 12', price: 989910, image: '/assets/phone2.png', brand: 'Samsung', memory: '128GB' , discount : "10" },
  //   {id : 4 , name: 'Galaxy S10', price: 989910, image: '/assets/phone3.png', brand: 'Samsung', memory: '64GB' , discount : "10" },
  //   {id : 5 , name: 'iPhone 13 mini', price: 989910, image: '/assets/phone4.png', brand: 'Apple', memory: '128GB' , discount : "10" },
  //   {id : 6 , name: 'Mi 11 Lite', price: 989910, image: '/assets/phone5.png', brand: 'Xiaomi', memory: '128GB' , discount : "10" },
  // ]

if(isLoading) return <p>در حال بارگذاری...</p>
if(isError) return <p>خطا در دریافت محصولات!</p>

   return (
     <div className='h-full  mt-8  mx-auto text-center '>
     <div className='   rounded-lg mx-auto text-center  '>
       <div className='flex flex-col-reverse justify-start items-end md:flex-row md:justify-between text-slate-100 font-medium m-2'>
         <div className='text-lg cursor-pointer flex justify-center items-center gap-2'>
           <span>
             <MdKeyboardArrowRight size={20} className='text-[#ADC6FF]' />
           </span>
           <span className='text-neutral-800'>بیشتر ...</span>
         </div>
         <div className='font-medium flex justify-center items-center gap-2'>
           <span className='text-xl text-neutral-800'>محصولات محبوب</span>
           <span className='w-1 h-8 bg-[#ADC6FF] rounded-lg'></span>
         </div>
       </div>
      <div className='w-full flex justify-center items-center' >
      <ProdutsSection  products={data}  />
      </div>
     </div>
   </div>
   
   )
}

export default PopularProducts
