"use client";
import Loader2 from "@/components/Loader2";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Community = () => {
  const [publishData, setPublishData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { getToken ,userId} = useAuth();

  const getPublishCreations = async () => {
    // setPublishData(dummyPublishedCreationData);
    try {
      setLoading(true);
      const res = await axios.get(`/api/user?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (res?.data?.success) {
        setPublishData(res.data.publishedCreations);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch data::", error);
      toast.error(error);
    }
  };

  const likeToggle = async (id, user_id) => {
    try {
      const { data } = await axios.post(
        "/api/user",
        { id: id, userId: user_id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data?.success) {
        toast.success(data.message);
        await getPublishCreations();
      }
    } catch (error) {
      console.log("Failed to like::", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getPublishCreations();
    }
  }, [user]);
  
  return (
    <div className="w-full p-5">
      <h1 className="text-xl font-medium text-gray-700 my-3">All Creations</h1>
      {loading ? (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
          <Loader2 />
        </div>
      ) : (
        <div className="my-7 max-h-full md:mb-0 md:max-h-[500px] mx-auto overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-1.5 bg-white p-3">
          {publishData.length > 0 &&
            publishData?.map((item) => (
              <div
                key={item?.id}
                className="w-full max-w-sm relative cursor-pointer overflow-hidden group"
              >
                <div className="w-full h-65">
                  <Image
                    src={item.content}
                    alt="image"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <div
                  onClick={() => {
                    likeToggle(item.id, item.user_id)
                    
                    
                  }}
                  className="flex items-center text-white gap-2.5 absolute bottom-4 right-4 z-10 cursor-pointer transition transform active:scale-90"
                >
                  <span className="text-sm font-semibold">
                    {item.likes.length}
                  </span>
                  <Heart size={20} className={`${
                        item.likes.includes(item?.user_id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}/>
                </div>

                <div className="p-4 bg-black/40 absolute left-0 bottom-0 right-0 top-0 flex justify-between items-end gap-1.5 opacity-0 group-hover:opacity-100 ">
                  <p className="w-full max-w-sm text-white text-sm">
                    {item.prompt}
                  </p>

                  <div className="flex items-center text-white gap-2.5 absolute bottom-4 right-4 cursor-pointer">
                    <span className="text-sm font-semibold">
                      {item.likes.length}
                      
                    </span>
                    <Heart
                      size={20}
                      className={`${
                        item.likes.includes(item?.user_id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Community;
