
import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItems = ({ item }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div
      className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg"
      onClick={() => setExpand(!expand)}
    >
      <div className="flex justify-between items-center gap-2.5 cursor-pointer">
        <div>
          <h2
            className={`text-sm md:text-balance text-gray-700 font-medium ${
              item?.prompt > 60 && "max-w-[150px] text-ellipsis truncate"
            }`}
          >
            {item?.prompt}
          </h2>

          <p className="mt-1 text-sm font-medium text-gray-400">
            {item.type} - {new Date(item?.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-500 text-sm cursor-pointer transition transform active:scale-90">
          {item?.type?.split("-")[0][0]?.toUpperCase() +
            item?.type?.split("-")[0]?.slice(1)}
        </button>
      </div>
      {expand && (
        <div>
          {item.type === "image" && item.content ? (
            <div className="max-w-md h-65 mt-4">
              <img
                src={item.content}
                alt="image"
                
                className="mt-4 w-full h-full object-contain rounded-md"
              />
            </div>
          ) : (
            <div className="mt-4 reset-tw">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItems;
