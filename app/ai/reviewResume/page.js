"use client";
import { assets } from "@/assets/assets";
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { CloudUpload, FileCog, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const { userId, getToken } = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!input) {
        toast("Please upload your resume");
        return;
      }

      const formData = new FormData();

      formData.append("resume", input);
      formData.append("userId", userId);

      const res = await axios.post("/api/resume-review", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (res?.data?.success) {
        setLoading(false);
        setAnalysis(res.data.content);
        // console.log(res.data.content);
        setInput(null);
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
          <Sparkles size={25} color="#059669" />
          <h1 className="text-xl font-medium text-gray-700">
            AI Resume Analyzer
          </h1>
        </div>
        <div className="mt-8">
          <label htmlFor="resume" className="text-sm font-medium text-gray-700">
            <span>Upload Resume</span>

            <div className="mt-3 w-full max-w-[170px] mx-auto cursor-pointer py-10 border-3 border-dotted border-gray-300 rounded-xl relative flex items-center justify-center group hover:border-emerald-600">
              <input
                type="file"
                name="resume"
                id="resume"
                hidden
                accept="application/pdf"
                onChange={(e) => setInput(e.target.files[0])}
                required
                placeholder="Upload resume to analyzed..."
                className="w-full"
              />
              {input ? (
                <Image
                  src={assets?.pdf}
                  alt="image-preview"
                  fill
                  priority
                  className="absolute left-0 top-0 right-0 bottom-0 rounded-xl object-cover"
                />
              ) : (
                <CloudUpload
                  size={40}
                  className="absolute z-0 text-[#D1D5DB] group-hover:text-emerald-600"
                />
              )}
            </div>
            <p className="text-center text-sm text-gray-400 my-1 font-light">
              Supports PDF resume only
            </p>
          </label>
        </div>

        <button
          type="submit"
          className="mt-10 w-full p-2.5 rounded-lg flex items-center justify-center gap-1.5 text-white cursor-pointer bg-linear-to-l from-lime-200 via-green-400 to-emerald-600 transition transform active:scale-90"
        >
          {loading ? <Loader /> : <FileCog size={20} color="white" />}
          {loading ? "Generating..." : "Analyze Resume"}
        </button>
      </form>
      <div className="w-full max-w-lg p-4 rounded-lg bg-white">
        <div className="flex items-center gap-2.5 mb-5">
          <FileCog size={25} color="#059669" />
          <h1 className="text-balance md:text-xl font-medium text-gray-700">
            Analyzed Resume
          </h1>
        </div>
        <div className={`${
            analysis?.length > 0 ? "h-full max-h-[550px]" : "h-80 max-h-[550px]"
          }  overflow-y-scroll w-full flex items-center justify-center`}>
          {analysis && analysis.length>0 ? (
            <div className="mt-5 reset-tw">
              <Markdown>{analysis}</Markdown>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <FileCog size={30} color="#a6a5a5" />
              <p className="text-sm text-gray-400">
                Your analyzed result will be displayed here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
