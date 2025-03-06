import React from "react";

const MessagesChatPanel = ({ selectedMessage }) => {
  if (!selectedMessage) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Select a message to view</div>;
  }

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100 w-full">
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold">{selectedMessage.sender}</h2>
        <p className="text-sm text-gray-500">{selectedMessage.text}</p>
        <p className="text-xs text-gray-400">{selectedMessage.time}</p>
      </div>

      <div className="flex-1 overflow-y-auto mt-4">
        <p className="text-gray-700">{selectedMessage.text}</p>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg text-sm"
        />
      </div>
    </div>
  );
};

export default MessagesChatPanel;
