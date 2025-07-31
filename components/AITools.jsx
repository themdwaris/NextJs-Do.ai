"use client";
import { useAiContext } from "@/context/DoAiContext";
import React from "react";
import { AiToolsData } from "@/assets/assets";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const AITools = () => {
  const {user} = useUser()
  const { router } = useAiContext();
  return (
    <div className="w-full px-5 sm:px-20 xl:px-32 py-10 md:py-24">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Our <span className="text-[#5045e6]">Ai</span> Tools
        </h1>
        <p className="max-w-md mx-auto my-2 text-sm md:text-lg text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, nihil
          at fugiat neque eaque vero?
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-2">
        {AiToolsData.map((tool, i) => (
          <div
            key={i}
            onClick={() => user?router.push(tool.path):toast.error("Please login first")}
            className="p-8 cursor-pointer rounded-lg shadow-[13px_19px_17px_-11px_rgba(0,_0,_0,_0.1)] hover:shadow-rose-200"
          >
            <div
              className="mb-8 w-fit p-2.5 rounded-lg text-white"
              style={{
                backgroundImage: `linear-gradient(to right, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon size={25} />
            </div>
            <h2 className="text-xl font-semibold my-3">{tool.title}</h2>
            <p className="text-gray-400">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITools;
