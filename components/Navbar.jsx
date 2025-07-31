"use client";
import Image from "next/image";
import React from "react";
import { ChevronRight } from "lucide-react";
import { assets } from "@/assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useAiContext } from "@/context/DoAiContext";


const Navbar = () => {
  const {router} =useAiContext()
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="w-full fixed z-10 py-3 px-5 sm:px-20 xl:px-32 flex justify-between items-center backdrop-blur-sm">
      <div
        className="w-24 md:w-28 flex items-center gap-1.5 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={assets.logo1} alt="logo" priority className="object-contain" />
      </div>

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className="cursor-pointer px-3 py-1.5 leading-3 rounded-full font-semibold flex items-center gap-1 bg-[#111113] text-sm text-white transition transform active:scale-90 hover:bg-[#000000]"
        >
          <span className="cursor-pointer">Login</span>
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
