"use client"
import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSpecialOffersProductas } from '@/api/specialOffers/specialOffersHook';
import ProdutsOffers from './offersProduct';
import Link from 'next/link';
export default  function SpecialOffers() {
  const { data, isLoading, isError } = useSpecialOffersProductas()
 

  if(isLoading) return <p>در حال بارگذاری...</p>
  if(isError) return <p>خطا در دریافت محصولات!</p>

  return (
    <div className=' mt-4 flex justify-center items-center overflow-x-auto'>
    <div className='bg-primary w-[94%] h-full rounded-lg mx-auto text-center p-4 md:p-0  '>
      <div className='flex flex-col-reverse justify-start items-end md:flex-row md:justify-between text-slate-100 font-medium m-2'>
        <Link href={"#"} className='text-lg flex justify-center items-center gap-2 cursor-pointer'>
          <span>
            <MdKeyboardArrowRight size={20} className='text-[#ADC6FF]' />
          </span>
          <span className='text-slate-200'>بیشتر ...</span>
        </Link>
        <div className='font-medium flex justify-center items-center gap-2'>
          <span className='text-xl'>پیشنهادات ویژه</span>
          <span className='w-1 h-8 bg-[#ADC6FF] rounded-lg'></span>
        </div>
      </div>
    <div className='flex justify-center items-center'>
    <ProdutsOffers  products={data}  />
    </div>
     
    </div>
  </div>
  
  )
}


