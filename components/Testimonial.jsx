import {dummyTestimonialData } from "@/assets/assets";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const Testimonial = () => {
  return (
    <div className="w-full px-5 sm:px-20 xl:px-32 py-16">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Loved <span className="text-[#5045e6]">by</span> creators
        </h1>
        <p className="max-w-md mx-auto my-2 text-sm md:text-lg text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, nihil
          at fugiat neque eaque vero?
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-2">
        {dummyTestimonialData.map((testo, i) => (
          <div
            key={i}
            className="p-8 cursor-pointer rounded-lg shadow-[13px_19px_17px_-11px_rgba(0,_0,_0,_0.1)] hover:shadow-rose-200"
          >
            <div className="flex items-center gap-1 mb-7">
              {Array(5)
                .fill(0)
                .map((_, i) => {
                  if (i < testo.rating) {
                    return <Star key={i} size={16} color="#5045e6" fill="#5045e6" />;
                  } else {
                    return <Star key={i} size={16} color="#5045e6" />;
                  }
                })}
            </div>
            <p className="text-gray-600 text-sm">{testo.content}</p>
            <p className="my-3 h-[1px] bg-gray-300"></p>

            <div className="flex items-center gap-2.5">
              <Image
                src={testo.image}
                alt="user-profile"
                width={57}
                priority
                className="object-contain rounded-full"
              />
              <div>
                <h2 className="text-sm font-semibold">{testo.name}</h2>
                <p className="text-[14px] text-gray-600">{testo.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
