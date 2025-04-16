"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import "../../ui/main/embla.css" ;
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Product from '@/components/ui/main/cardProduct'

type Product = {
  name:string ,
  image:string ,
  id:number ,
  price:number ,
  discount : string,
  memory : string,
  brand : string
}
export interface ProductsProps {  
  products: Product[];  
  }
export default function ProdutsOffers({products}:ProductsProps) {

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: "rtl" },
    [Autoplay({ delay: 3000 })]
  );

 
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  return (
    <div  className='embla p-2 ' ref={emblaRef}>

      <div  className="embla__container">

        {products && products?.map((product , idex) => (
          <div key={idex} className='embla__slide  flex justify-center items-center rounded-lg'>
          <Product product={product} />
        </div>
        ))}
        </div>
        <div className="embla__controls lg:hidden mt-1 flex justify-center items-center">
        <button
          className="bg-primary text-white p-1 rounded-lg m-1 flex justify-center items-center"
          onClick={scrollPrev}
          // disabled={!emblaApi?.canScrollPrev()}
        >
         <MdOutlineKeyboardArrowRight />
         <span>قبلی</span>
          
        </button>
        <button
          className="bg-primary text-white p-1 rounded-lg m-1 flex justify-center items-center"
          onClick={scrollNext}
          // disabled={!emblaApi?.canScrollNext()}
        >
         <span>بعدی</span> 
          <MdOutlineKeyboardArrowLeft />
        </button>
      </div>
        </div>
  )
}

