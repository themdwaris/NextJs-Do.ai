"use client";
import CreationItems from "@/components/CreationItems";
import Loader2 from "@/components/Loader2";
import { Protect, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { Gem, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { getToken, userId } = useAuth();

  const getCreationsData = async () => {
    // setPublishData(dummyPublishedCreationData);
    try {
      setLoading(true);
      const res = await axios.get(`/api/user?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (res?.data?.success) {
        setCreations(res.data.creations);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch data::", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getCreationsData();
    }
  }, []);

  return (
    <div className="h-full p-5 overflow-y-scroll">
      <div className="w-full flex flex-col md:flex-row md:items-center flex-wrap gap-3.5">
        {/* creation card */}
        <div className="w-full md:max-w-72 rounded-lg bg-blue-100 p-5 flex justify-between">
          <div className="text-gray-700">
            <p className="text">Total creation</p>
            <span className="font-bold text-2xl mt-1">{creations.length}</span>
          </div>
          <p className="w-10 h-10 rounded-lg text-white flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-pink-500">
            <Sparkles size={25} />
          </p>
        </div>

        <div className="w-full md:max-w-72 rounded-lg bg-blue-100 p-5 flex justify-between">
          <div className="text-gray-700">
            <p className="text">Active plan</p>
            <span className="font-semibold text-2xl mt-1">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </span>
          </div>
          <p className="w-10 h-10 rounded-lg text-white flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-900">
            <Gem size={25} />
          </p>
        </div>
      </div>

      <div className="my-10 space-y-3">
        <h2 className="text-xl font-medium">Recent creations</h2>
        {loading ? (
          <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
            <Loader2 />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {creations.map((item) => (
              <CreationItems key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
