"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { LuShoppingCart } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import SearchBox from "../../components/searchBox/searchbox";

export default function Head() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center ">
      <div className=" flex justify-center relative z-50 md:fixed w-full md:w-[88%]  h-10 mx-auto ">
      {/* mobile  */}
        <div
          className={`md:hidden transition-all duration-300   ease-in   ${open ? "translate-x-[0px]" : "translate-x-[800px]"
            } bg-white/95 p-4  z-50 absolute h-screen  w-full  `}
        >
          <div className="flex justify-end ">
            <IoClose onClick={() => setOpen(!open)} size={20} />
          </div>
          
          <div className="  flex flex-col gap-6  items-start text-black text-lg font-bold mt-4 ">
            <Link onClick={()=>setOpen(!open) } className="ml-4" href={"/"}>
              خانه
            </Link>
            <Link onClick={()=>setOpen(!open)} className="ml-4" href={"/"}>
              محصولات
            </Link>
            <Link onClick={()=>setOpen(!open)} className="ml-4" href={"/"}>
              درباره ما
            </Link>
            <Link onClick={()=>setOpen(!open)} className="ml-4" href={"/"}>
              {" "}
              ارتباط با ما
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 text-center mt-12" >
              <Link onClick={()=>setOpen(!open)} href={"/"} className="border flex justify-center items-center  text-xl border-primary w-full h-12 rounded-lg bg-primary text-slate-50">
                ثبت نام
              </Link>
              <Link onClick={()=>setOpen(!open)} href={"/"} className="border text-center flex justify-center items-center  text-xl border-primary w-full h-12 rounded-lg text-primary">
                ورود
              </Link>
            </div>
        </div>
          {/* desktop */}
        <div className="w-full md:w-[90%] text-center md:mt-3 h-10 flex justify-between items-center bg-white/95 shadow-md   overflow-hidden rounded-lg  md:top-4  md:p-6 ">
        <div className="mx-2 flex md:hidden items-center gap-2  ">
          
            <AiOutlineMenu
              size={20}
              className="md:hidden"
              onClick={() => setOpen(!open)}
            />
            <div className="md:hidden">
              <LuShoppingCart size={20} />
            </div>
          
          
          </div>
        <div className=" mx-2 flex items-center gap-3 ">
            <FiSearch size={20} className="md:hidden" />
            <h2 className="font-bold text-xl lg:text-2xl text-[#597EF7]">کارتو</h2>

            <SearchBox />
          </div>

        
          <div className="hidden md:flex gap-3 text-neutral-900 lg:text-lg  ">
            <Link className="hover:text-primary text-sm lg:text-base transition-all duration-300 ease-in focus:text-primary" href={"/"}>خانه</Link>
            <Link className="hover:text-primary text-sm lg:text-base transition-all duration-300 ease-in focus:text-primary" href={"/"}>محصولات</Link>
            <Link className="hover:text-primary text-sm lg:text-base transition-all duration-300 ease-in focus:text-primary" href={"/"}> ارتباط با ما</Link>
            <Link className="hover:text-primary text-sm lg:text-base transition-all duration-300 ease-in focus:text-primary" href={"/"}>درباره ما</Link>
          </div>

        
          <div className="hidden md:flex gap-3 ">
              
                <>
                  
                  <Link
                    href={"/"}
                    className="border flex justify-center items-center  hover:bg-primary hover:text-white border-primary w-12 lg:w-16 h-8 text-sm lg:text-base rounded-lg text-primary"
                  >
                    ورود
                  </Link>
                  <Link
                    href={"/"}
                    className="border flex justify-center items-center border-primary w-12 lg:w-16 h-8 rounded-lg bg-primary whitespace-nowrap text-sm lg:text-base text-slate-50"
                  >
                    ثبت نام
                  </Link>
                </>
            
            </div>
        </div>
      </div>
    </div>
  );
}
