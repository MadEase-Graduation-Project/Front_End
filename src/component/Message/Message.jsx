import React from "react";

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

export default Message;
