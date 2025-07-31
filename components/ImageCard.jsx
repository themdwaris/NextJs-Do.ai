"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const ImageCard = ({ item,getPublishCreations }) => {

  const { getToken } = useAuth();

  const likeToggle = async () => {
 
    
    try {
      const {data}=await axios.post(
        "/api/user",
        { id: item?.id, userId: item?.user_id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if(data?.success){ 
        toast.success(data.message)
        await getPublishCreations()
      }
      
    } catch (error) {
      console.log("Failed to like::",error);
      toast.error(error)
      
    }
  };
 
  
  return (
    <div className="w-full max-w-sm relative cursor-pointer overflow-hidden group">
      <div className="w-full h-65">
        <Image src={item.content} priority alt="image" fill className="object-cover" />
      </div>

      <div onClick={likeToggle} className="flex items-center text-white gap-2.5 absolute bottom-4 right-4 z-10 cursor-pointer transition transform active:scale-90">
        <span className="text-sm font-semibold">{item.likes.length}</span>
        <Heart size={20} />
      </div>

      <div className="p-4 bg-black/40 absolute left-0 bottom-0 right-0 top-0 flex justify-between items-end gap-1.5 opacity-0 group-hover:opacity-100 ">
        <p className="w-full max-w-sm text-white text-sm">{item.prompt}</p>

        <div className="flex items-center text-white gap-2.5 absolute bottom-4 right-4 cursor-pointer">
          <span className="text-sm font-semibold">{item.likes.length}</span>
          <Heart
            size={20}
            className={`${
              item?.likes?.includes(item?.user_id)
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
