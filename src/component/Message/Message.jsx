/**import React from "react";

const Message = ({ own, text }) => {
  return (
    <div
      className={`flex flex-col p-2.5 rounded-lg my-2 shadow-md max-w-[70%] ${
        own ? "bg-[#dcf8c6] self-end" : "bg-[#f1f1f1] self-start"
      }`}
    >
      <p className="text-[16px] text-[#333] leading-snug">{text}</p>
      <div className="text-xs text-[#888] mt-1">Just now</div>
    </div>
  );
};

export default Message;*/ 

import React from "react";

const Message = ({ own, text, createdAt }) => {
  const time = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Now";

  return (
    <div className={`w-full flex ${own ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`flex flex-col px-4 py-2 rounded-2xl max-w-[70%] sm:max-w-[50%] shadow
          ${own ? "bg-menavy text-white" : "bg-gray-200 text-gray-900"}`}
      >
        <p className="text-sm leading-relaxed break-words">{text}</p>
        <div className={`text-[10px] mt-1 text-right ${own ? "text-gray-200" : "text-gray-500"}`}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;
