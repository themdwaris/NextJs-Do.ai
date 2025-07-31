"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import SidebarMenu from "@/components/SidebarMenu";
import { useAiContext } from "@/context/DoAiContext";
import { useUser, SignIn } from "@clerk/nextjs";

const AiLayout = ({ children }) => {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { router } = useAiContext();

  return (
    <>
      {user ? (
        <div className="h-screen">
          <nav className="w-full sticky bg-white z-40 px-8 flex items-center min-h-14 justify-between">
            <Image
              src={assets.logo1}
              alt="logo"
              width={100}
              className="object-contain w-[80px] md:w-[100px] cursor-pointer"
              onClick={() => router.push("/")}
            />
            {sidebarOpen ? (
              <X
                size={22}
                color="#111113"
                onClick={() => setSidebarOpen(false)}
              />
            ) : (
              <Menu
                size={22}
                color="#111113"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              />
            )}
          </nav>

          <main className="flex-1 w-full flex h-[calc(100vh-56px)]">
            <SidebarMenu
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="flex-1 bg-gradient-to-r from-violet-50 to-blue-50">{children}</div>
          </main>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <SignIn routing="hash" />
        </div>
      )}
    </>
  );
};

export default AiLayout;
