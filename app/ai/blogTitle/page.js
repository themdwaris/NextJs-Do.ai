"use client";
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const BlogTitles = () => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("General");
  const [blogTitle, setBlogTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Travel",
    "Life Style",
    "Food",
    "Education",
  ];
  const { userId, getToken } = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an blog title for the keyword [${input}] in category ${category}.`;

      const res = await axios.post(
        "/api/generate-blog-title",
        {
          userId,
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (res?.data?.success) {
        setLoading(false);
        setBlogTitle(res.data.content);
        setInput("");
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
          <Sparkles size={25} color="#10B981" />
          <h1 className="text-xl font-medium text-gray-700">
            AI Title Generator
          </h1>
        </div>
        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">Keyword</label>
          <input
            type="text"
            name="blog"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            placeholder="Describe your Blog..."
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none mt-1 "
          />
        </div>

        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <div className="mt-3 flex items-center gap-2.5 flex-wrap">
            {categories.map((item) => (
              <span
                key={item}
                onClick={() => setCategory(item)}
                className={`px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-500 cursor-pointer transition transform active:scale-90 ${
                  item === category && "border-2 border-emerald-500"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-10 w-full p-2.5 rounded-lg flex items-center justify-center gap-1.5 text-white cursor-pointer bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 transition transform active:scale-90"
        >
          
          {loading ? <Loader /> : <Hash size={20} color="white" />}
          {loading ? "Generating..." : "Generate Blog Title"}
        </button>
      </form>
      <div className="w-full max-w-lg p-4 rounded-lg bg-white">
        <div className="mb-5 flex items-center gap-2.5">
          <Hash size={25} color="#10B981" />
          <h1 className="text-balance md:text-xl font-medium text-gray-700">
            Generated Titles
          </h1>
        </div>
        {/* <div className="h-80 max-h-[550px] overflow-y-scroll w-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2.5"><Hash size={30} color="#a6a5a5" /> <p className="text-sm text-gray-400">Your generated blog will be displayed here...</p></div>
        </div> */}
        <div
          className={`${
            blogTitle.length > 0 ? "h-full max-h-[550px]" : "h-80 max-h-[550px]"
          }  overflow-y-scroll w-full flex items-center justify-center`}
        >
          {blogTitle && blogTitle.length > 0 ? (
            <div className="mt-5 reset-tw">
              <Markdown>{blogTitle}</Markdown>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <Hash size={30} color="#a6a5a5" />
              <p className="text-sm text-gray-400">
                Your generated blog titles will be displayed here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
