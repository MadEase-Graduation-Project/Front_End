import React from "react";

const Conversation = ({ conversation, currentUserId, onClick }) => {
  const { otherUser, lastMessage } = conversation;

  if (!otherUser) {
    console.error("Missing otherUser in conversation:", conversation);
    return null;
  }
  console.log(lastMessage)
  const name =
    otherUser.role === "doctor" ? `Dr. ${otherUser.name}` : otherUser.name;
  const imageUrl = otherUser.ImgUrl || "/default-avatar.png";

  const isPatientSender = lastMessage?.sender !== currentUserId;

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start p-2.5 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#f0f2f5]"
    >
      <div className="flex items-center w-full">
        <img
          src={imageUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover mr-2.5"
        />
        <div className="flex-1">
          <div className="text-[16px] font-medium text-[#333]">{name}</div>
          {lastMessage?.text && (
            <div
              className={`text-sm truncate ${
                isPatientSender ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              {lastMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
