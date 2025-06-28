import React, { useEffect, useRef, useState } from "react";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import { io } from "socket.io-client";

import { Menu, X } from "lucide-react";
const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const socket = useRef(null);
  const token = "your-token-here";
  const sender = "your-sender-id-here";

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", sender);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/conversation/${sender}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/message/${conversationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleConversationClick = (conversationId) => {
    setSelectedConversationId(conversationId);
    fetchMessages(conversationId);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      conversationId: selectedConversationId,
      sender,
      text: newMessage,
    };

    try {
      const response = await fetch("http://localhost:8080/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });

      const savedMessage = await response.json();
      setMessages([...messages, savedMessage]);
      setNewMessage("");

      // ✅ Reset textarea height
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.style.height = "auto";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e6ecf3] text-sm font-sans overflow-hidden">
      {/* 🍔 Column with hamburger and logo (mobile only) */}
      <div className="fixed top-0 left-0 z-40 h-screen w-16 bg-[#f5f7fa] border-r border-gray-200 flex flex-col items-center justify-start p-2 sm:hidden">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <span className="mt-2 text-xs font-bold text-menavy">Logo</span>
      </div>

      {/* 🔲 Overlay: click outside to close sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-20 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 📥 Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white sm:bg-[#f5f7fa] border-r border-gray-200 p-4 transform transition-transform duration-500 ease-in-out
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      sm:translate-x-0 sm:static sm:w-[25%] sm:block overflow-y-auto`}
      >
        {/* ❌ Close Button (Mobile only) */}
        <div className="sm:hidden flex justify-end mb-2">
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-menavy">Chats</h2>
        <input
          placeholder="Search or start new chat"
          className="w-full px-3 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-menavy transition"
        />
        <div className="flex flex-col gap-2">
          {conversations.map((c) => (
            <Conversation
              key={c._id}
              conversation={{
                name: c.name,
                imageUrl: c.imageUrl || null,
              }}
              onClick={() => {
                handleConversationClick(c._id);
                setIsSidebarOpen(false);
              }}
            />
          ))}
        </div>
      </div>

      {/* 💬 Main Chat Area */}
      <main className="flex-1 flex flex-col p-4 w-full sm:w-[75%] z-10 relative ml-16 sm:ml-0 transition-all duration-500 ease-in-out">
        <div className="flex-1 bg-white rounded-xl p-6  border border-gray-100 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center mt-20">
              Start a conversation
            </div>
          ) : (
            messages.map((msg) => (
              <Message
                key={msg._id}
                own={msg.sender === sender}
                text={msg.text}
                imageUrl={msg.imageUrl || null}
              />
            ))
          )}
        </div>

        <div className="flex mt-4 items-end gap-3">
          <textarea
            placeholder="Type a message"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none text-sm max-h-48 overflow-y-auto shadow-sm focus:outline-none focus:ring-2 focus:ring-menavy transition"
            rows={1}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              const target = e.target;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-2 bg-menavy text-white rounded-lg hover:bg-mepale transition-all duration-200 shadow-md"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};
export default Messenger;
