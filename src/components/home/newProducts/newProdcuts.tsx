"use client"
import { useNewProducts } from '@/api/newProducts/newProductsHook'
import ProdutsSection from '@/components/ui/main/produtsSection'
import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

export default  function NewProdcuts() {
  const { data, isLoading, isError } = useNewProducts()

  if (isLoading) return <p>در حال بارگذاری...</p>
  if (isError) return <p>خطا در دریافت محصولات!</p>
  
  return (
    <div className='h-full mt-8 flex justify-center items-center mx-auto text-center overflow-x-auto'>
        <div className='w-[94%] h-full rounded-lg mx-auto text-center  '>
          <div className='flex flex-col-reverse justify-start items-end md:flex-row md:justify-between text-slate-100 font-medium m-2'>
            <Link href={"#"} className='text-lg flex justify-center items-center gap-2 cursor-pointer'>
              <span>
                <MdKeyboardArrowRight size={20} className='text-[#ADC6FF]' />
              </span>
              <span className='text-neutral-800'>بیشتر ...</span>
            </Link>
            <div className='font-medium flex justify-center items-center gap-2'>
              <span className='text-xl text-neutral-800'>محصولات جدید</span>
              <span className='w-1 h-8 bg-[#ADC6FF] rounded-lg'></span>
            </div>
          </div>
          <ProdutsSection  products={data}  />
         
         
        </div>
      </div>
  )
}


