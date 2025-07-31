"use client";
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Sparkles, SquarePen } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const WriteArticle = () => {
  const [selectedLength, setSelectedLength] = useState(800);
  const [input, setInput] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);

  const { getToken,userId } = useAuth();

  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];
 
  const formHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article on [${input}] in ${selectedLength} words.`;
      
      const res = await axios.post(
        "/api/generate-article",
        {
          userId,
          prompt,
          length: selectedLength,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if(res?.data?.success) {
        setLoading(false);
        setArticle(res.data.content);
        setInput('')
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
      console.log("Failed generate article::", error);
    }
  };
  // console.log(selectedLength);

  return (
    <div className="p-5 h-full overflow-y-scroll flex flex-col md:flex-row items-center md:items-start gap-3 py-7">
      <form
        onSubmit={formHandler}
        className="w-full max-w-lg p-4 rounded-md bg-white"
      >
        <div className="flex items-center gap-2.5">
          <Sparkles size={25} color="#5c67ff" />
          <h1 className="text-xl font-medium text-gray-700">
            Article Configuration
          </h1>
        </div>
        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">
            Article Topic
          </label>
          <input
            type="text"
            name="article"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            placeholder="Describe your title..."
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none mt-1 "
          />
        </div>

        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">
            Article Length
          </label>
          <div className="mt-4 flex items-center gap-2.5 flex-wrap">
            {articleLength.map((len) => (
              <span
                key={len.length}
                onClick={() => setSelectedLength(len.length)}
                className={`px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-500 cursor-pointer transition transform active:scale-90 ${
                  selectedLength === len.length && "border-2 border-blue-500"
                }`}
              >
                {len.text}
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-10 w-full p-2.5 rounded-lg flex items-center justify-center gap-1.5 text-white cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 transition transform active:scale-90"
        >
          {loading ? <Loader /> : <SquarePen size={20} color="white" />}
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>
      <div className="w-full max-w-lg p-4 rounded-lg bg-white">
        <div className="flex items-center gap-2.5 mb-5">
          <SquarePen size={25} color="#5c67ff" />
          <h1 className=" text-balance md:text-xl font-medium text-gray-700">
            Article Configuration
          </h1>
        </div>
        <div
          className={`${
            article.length > 0 ? "h-full max-h-[550px]" : "h-80 max-h-[550px]"
          }  overflow-y-scroll w-full flex items-center justify-center`}
        >
          {article && article.length > 0 ? (
            <div className="mt-5 reset-tw">
              <Markdown>{article}</Markdown>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <SquarePen size={30} color="#a6a5a5" />
              <p className="text-sm text-gray-400">
                Your generated article will be displayed here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
