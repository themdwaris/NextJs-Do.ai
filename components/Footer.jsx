import Image from "next/image";
import React from "react";
import { assets } from "@/assets/assets";

const Footer = () => {
  return (
    <div className="w-full px-5 sm:px-20 xl:px-32 my-24">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <Image src={assets.logo1} alt="logo" priority width={96} />
          <p className="max-w-sm text-gray-700 text-sm mt-6">
            Experience the power of AI with Do.ai Transform your content
            creation with our suite of premium AI tools. Write articles,
            generate images, and enhance your workflow.
          </p>
        </div>
        <div className="flex flex-col md:flex-row ">
            <div className="mt-6 md:mt-0 flex flex-col gap-2 text-gray-600 text-sm">
                <h3 className="text-sm font-semibold text-gray-800">Company</h3>
                <span>Home</span>
                <span>About</span>
                <span>Contact</span>
                <span>Privacy & Policy</span>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col gap-2 text-gray-600 text-sm">
                <h3 className="text-sm font-semibold text-gray-800">Our Newsletter</h3>
                <p className="mb-3 max-w-sm text-gray-700 text-sm">The latest news, articles, and resources, sent to your inbox weekly.</p>
                <div className="max-w-[300px] flex md:mx-auto items-center gap-1.5">
                    <input type="text" placeholder="Email" className="w-full p-2 rounded-md border border-gray-300 outline-none"/>
                    <button className="text-sm text-white rounded-md font-semibold p-2 bg-[#5045e6] cursor-pointer transition transform active:scale-90">Subscribe</button>
                </div>
            </div>
        </div>
      </div>
      <p className="mt-10 text-center py-5 border-t border-gray-300 text-sm text-gray-500">Copyright {new Date().getFullYear()} © Do.ai. All Right Reserved.</p>
    </div>
  );
};

export default Footer;
