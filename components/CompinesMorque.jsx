import { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const CompaniesMarquee = () => {
    const [stopScroll, setStopScroll] = useState(false);
    const cardData = [
        {
            image:assets.meta
        },
        {
           
            image: assets.samsung,
        },
        {
            
            image: assets.amazon,
        },
        {
            
            image: assets.google,
        },
        {
            
            image: assets.microsoft,
        },
        
        {
            
            image: assets.netflix,
        },
        {
           
            image: assets.linkedin,
        },
        {
            
            image: assets.slack,
        },
        {
            
            image: assets.prime,
        },
    ];

    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="mt-14 overflow-hidden w-full relative max-w-6xl mx-auto" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
                    <div className="flex">
                        {[...cardData, ...cardData].map((card, index) => (
                            <div key={index} className="w-[100px] md:w-[150px] mx-2 md:mx-4 h-[5rem] relative group hover:scale-90 transition-all duration-300">
                                <Image src={card.image} alt="card" 
                                priority className="w-full h-full object-contain cursor-pointer" />
                                
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </>
    );
};

export default CompaniesMarquee