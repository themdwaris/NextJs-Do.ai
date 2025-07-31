"use client";
import { assets } from "@/assets/assets";
import { useAiContext } from "@/context/DoAiContext";
import { CirclePlay, Sparkles } from "lucide-react";
import Image from "next/image";
import CompaniesMarquee from "./CompinesMorque";


const Hero = () => {
  const { router } = useAiContext();
  
  return (
    <div className="w-full px-5 sm:px-20 xl:px-32 relative inline-flex flex-col justify-center bg-[url(/gradientbackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="w-full max-w-2xl mx-auto text-[#111113]">
        <button className="mt-10 sm:mt-0 flex items-center cursor-pointer mx-auto gap-1.5 bg-[#111113] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
          <span>Generate with AI</span> <Sparkles size={16} />
        </button>

        <h1 className="text-center text-5xl lg:text-7xl font-semibold my-5">
          Discover the future of AI tools with
          <span className="text-[#5045e6]"> do.ai</span>
        </h1>
        <p className="text-center text-sm md:text-lg">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-4">
          <button
            onClick={() => router.push("/ai")}
            className="px-4 py-2 text-white rounded-lg bg-[#6e4aff] cursor-pointer text-sm font-semibold transition transform active:scale-90"
          >
            Start creating for free
          </button>
          <button className="flex items-center gap-1.5 cursor-pointer transition transform active:scale-90">
            <CirclePlay size={18} color="#111113" />
            <span className="text-sm text-[#111113] font-semibold">
              Watch demo
            </span>
            <span className="text-xs text-gray-500">2 min</span>
          </button>
        </div>

        <div className="mt-8 flex items-center gap-3 justify-center">
          <Image src={assets.user_group} alt="user-group" priority width={100} />
          <p className="text-gray-800 font-light">Trusted by 10k+ people</p>
        </div>
      </div>
      <CompaniesMarquee />
    </div>
  );
};

export default Hero;
