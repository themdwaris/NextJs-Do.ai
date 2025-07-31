"use client";
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { CloudUpload, DownloadCloud, Scissors, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const { userId, getToken } = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!file) {
        toast("Please upload an a image");
        return;
      }
      if (!input || input.split(" ").length > 1) {
        toast("Please enter one object name");
        return;
      }

      const formData = new FormData();

      formData.append("image", file);
      formData.append("userId", userId);
      formData.append("object", input);

      const res = await axios.post("/api/remove-obj", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (res?.data?.success) {
        setLoading(false);
        setImage(res.data.content);
        // console.log(res.data.content);
        setInput("");
        setFile(null);
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
      console.log("Failed generate article::", error);
    }
  };

  return (
    <div className="p-5 h-full overflow-y-scroll flex flex-col md:flex-row items-center md:items-start gap-3 py-7">
      <form
        onSubmit={formHandler}
        className="w-full max-w-lg p-4 rounded-md bg-white"
      >
        <div className="flex items-center gap-2.5">
          <Sparkles size={25} color="#14B8A6" />
          <h1 className="text-xl font-medium text-gray-700">
            AI Object Removal
          </h1>
        </div>
        <div className="mt-8">
          <label
            htmlFor="remove-bg"
            className="text-sm font-medium text-gray-700"
          >
            <span>Upload image</span>

            <div className="mt-3 md:mt-0 max-w-[170px] mx-auto cursor-pointer px-5 py-10 border-3 border-dotted border-gray-300 rounded-xl relative flex items-center justify-center group hover:border-teal-500">
              <input
                type="file"
                name="remove-bg"
                id="remove-bg"
                hidden
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
                placeholder="Upload image to remove background..."
                className="w-full "
              />
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="image-preview"
                  fill
                  priority
                  className="absolute left-0 top-0 right-0 bottom-0 rounded-xl object-cover"
                />
              ) : (
                <CloudUpload
                  size={40}
                  className="absolute z-0 text-[#D1D5DB] group-hover:text-teal-500"
                />
              )}
            </div>
          </label>
        </div>
        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">
            <span>Describe object to remove</span>
          </label>
          <textarea
            type="text"
            name="object"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g Remove chair from this image"
            rows={4}
            className="mt-1 w-full outline-none border border-gray-300 p-4 rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-10 w-full p-2.5 rounded-lg flex items-center justify-center gap-1.5 text-white cursor-pointer bg-linear-to-l from-green-500 via-emerald-500 to-teal-500 transition transform active:scale-90"
        >
          {loading ? <Loader /> : <Scissors size={20} color="white" />}
          {loading ? "Generating..." : "Remove Object"}
        </button>
      </form>
      <div className="w-full max-w-lg p-4 rounded-lg bg-white">
        <div className="flex items-center gap-2.5">
          <Scissors size={25} color="#14B8A6" />
          <h1 className="text-balance md:text-xl font-medium text-gray-700">
            Updated Image
          </h1>
        </div>
        <div className="h-80 max-h-[550px] overflow-y-scroll w-full flex items-center justify-center">
          {image && image.trim() !== "" ? (
            <img
              src={image}
              alt="generated-img"
              className="w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <Scissors size={30} color="#a6a5a5" />
              <p className="text-sm text-gray-400">
                Your object removed generated image will be displayed here...
              </p>
            </div>
          )}
        </div>
        {image && image.trim() !== "" && (
          <a
            href={image}
            download="generated-image.png"
            target="_blank"
            title="Download Image"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded hover:bg-indigo-700 transition"
          >
            <DownloadCloud /> Download
          </a>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
