"use client";
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import {  DownloadCloud, Images, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const GenerateImage = () => {
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [style, setStyle] = useState("Realistic");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = [
    "Realistic",
    "Ghibli",
    "Anime",
    "Cartoon",
    "Fantasy",
    "3D Style",
  ];
  const { userId, getToken } = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in a ${style} style.`;

      const res = await axios.post(
        "/api/generate-img",
        {
          userId,
          prompt,
          publish,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (res?.data?.success) {
        setLoading(false);
        setImage(res.data.content);
        setInput("");
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
          <Sparkles size={25} color="#8B5CF6" />
          <h1 className="text-xl font-medium text-gray-700">
            AI Image Generator
          </h1>
        </div>
        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">
            Describe your image
          </label>
          <textarea
            type="text"
            name="image"
            value={input}
            rows={4}
            onChange={(e) => setInput(e.target.value)}
            required
            placeholder="Describe your Image..."
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none mt-1 "
          ></textarea>
        </div>

        <div className="mt-2">
          <label className="text-sm font-medium text-gray-700">Styles</label>
          <div className="mt-3 flex items-center gap-2.5 flex-wrap">
            {styles.map((item) => (
              <span
                key={item}
                onClick={() => setStyle(item)}
                className={`px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-500 cursor-pointer transition transform active:scale-90 ${
                  item === style && "border-2 border-purple-500"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Toggle switch */}
        <div className="mt-4 flex flex-wrap items-center justify-start gap-12">
          <label className="relative inline-flex items-center cursor-pointer text-gray-600 gap-3">
            <input
              type="checkbox"
              checked={publish}
              className="sr-only peer"
              onChange={(e) => setPublish(e.target.checked)}
            />
            <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
            <span className="dot absolute left-1 top-1.5 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
            Make this public
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-10 w-full p-2.5 rounded-lg flex items-center justify-center gap-1.5 text-white cursor-pointer bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition transform active:scale-90"
        >
          {loading ? <Loader /> : <Images size={20} color="white" />}
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>
      <div className="w-full max-w-lg p-4 rounded-lg bg-white">
        <div className="flex items-center gap-2.5 mb-5">
          <Images size={25} color="#8B5CF6" />
          <h1 className="text-balance md:text-xl font-medium text-gray-700">
            Generated Image
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
              <Images size={30} color="#a6a5a5" />
              <p className="text-sm text-gray-400">
                Your generated image will be displayed here...
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

export default GenerateImage;
