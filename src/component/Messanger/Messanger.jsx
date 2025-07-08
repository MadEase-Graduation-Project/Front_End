import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import { io } from 'socket.io-client';
import { fetchPublicDoctors } from "@/store/slices/doctorSlice";
import { fetchMYData } from "@/store/slices/userSlice";
import { selectPublicDoctors } from "@/store/selectors/doctorSelectors";
import { selectMyDetails } from "@/store/selectors/userSelectors";
import { Menu, X } from "lucide-react";
import { AnimatePresence ,motion} from "framer-motion";

export default function Messenger() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState(null); // Doctor ID
  const socket = useRef(null);
  const [loadingConversations, setLoadingConversations] = useState(true)
const bottomRef = useRef(null);

  const dispatch = useDispatch();
  const doctors = useSelector(selectPublicDoctors);
  const myDetails = useSelector(selectMyDetails);
  const myId = myDetails?._id; // User ID

  // Fetch user data and public doctors on mount
  useEffect(() => {
    dispatch(fetchMYData());
    dispatch(fetchPublicDoctors({ page: 1 }));
  }, [dispatch]);

  // Initialize socket connection
  useEffect(() => {
    if (!socket.current) {
      socket.current = io("ws://localhost:8080");
      console.log("🔌 Socket.IO connected:", socket.current);
    }
  }, []);

  // Register user with Socket.IO
  useEffect(() => {
    if (!myId || !socket.current) return;

    socket.current.emit("addUser", myId);
    console.log("User  ID registered with Socket.IO:", myId);

    const onMessage = (data) => {
      setMessages((prev) => [...prev, {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        conversationId: selectedConv?._id,
      }]);
    };

    socket.current.on("getMessage", onMessage);

    return () => {
      socket.current.off("getMessage", onMessage);
    };
  }, [myId, selectedConv?._id]);

  // Load conversations for the user
  useEffect(() => {
    if (!myId) return;

    const loadConversations = async () => {
      setLoadingConversations(true);
      try {
        const res = await fetch(`http://localhost:8080/api/conversation/${myId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error("Failed to load conversations");
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error("Load conversations error:", err);
      }
      finally{setLoadingConversations(false);}
    };

    loadConversations();
  }, [myId]);

  // Open a conversation
  const openConversation = async (conv) => {
    if (!conv || !Array.isArray(conv.members)) {
      console.error("Invalid conversation:", conv);
      return;
    }

    setSelectedConv(conv);
    const otherUserId = conv.members.find((id) => id !== myId);
   // console.log(`hebaggggggg${otherUserId}`)
    if (!otherUserId) {
      console.error("No other user found in conversation:", conv);
      return;
    }
    setReceiverId(otherUserId); // Set the doctor ID

    try {
      const res = await fetch(`http://localhost:8080/api/message/${conv._id}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error("Failed to load messages");
      const messagesData = await res.json();
      setMessages(messagesData);
    } catch (err) {
      console.error("Load messages error:", err);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConv) return;

    const body = {
      conversationId: selectedConv._id,
      sender: myId,
      text: newMessage,
    };

    try {
      const res = await fetch("http://localhost:8080/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      if (!res.ok) throw new Error("Failed to send message");
      const saved = await res.json();
      setMessages((m) => [...m, saved]);
      setNewMessage("");

      socket.current.emit("sendMessage", {
        senderId: myId,
        receiverId,
        text: body.text,
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  // Start a chat with a doctor
  const startChat = async (doctorId) => {
    console.log(doctorId,myId)
    const existing = conversations.find((c) => c.members && c.members.includes(doctorId));
    if (existing) return openConversation(existing);
  
    if (!myId || !doctorId) {
      console.error("User  ID or Doctor ID is undefined");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId: myId, receiverId: doctorId }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error("Failed to create conversation");

      const newConv = await res.json();

      if (newConv && newConv.data) {
        setConversations((c) => [newConv.data, ...c]);
        openConversation(newConv.data);
      } else {
        console.error("Invalid conversation data received:", newConv);
      }
    } catch (err) {
      console.error("Create conversation error:", err);
    }
  };

  // Filter doctors based on search input
  const matches = search
    ? doctors.filter((d) =>
        [d.name, d.specialization, d.city].some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  /* ──────────────────────────── UI */
  return (
    <div className="relative flex h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e6ecf3] text-sm overflow-hidden">
      {/* Mobile – hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-0 left-0 z-40 h-16 w-16 flex items-center justify-center border-r bg-[#f5f7fa] sm:hidden"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white sm:bg-[#f5f7fa] border-r p-4
        transition-transform duration-500 sm:static
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* Close btn (mobile) */}
        <button
          className="sm:hidden mb-2 ml-auto"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-menavy">Chats</h2>

        {/* Search box */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctors…"
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-menavy"
        />

        {/* Search results (animated) */}
        <div
          className="mb-5 space-y-2 overflow-hidden"
          style={{ minHeight: matches.length > 0 ? undefined : "0.5rem" }}
        >
          <AnimatePresence mode="popLayout">
            {search &&
              matches.map((doc, index) => (
                <motion.button
                  key={doc._id}
                  onClick={() => {
                    startChat(doc._id);
                    setSearch("");
                    setSidebarOpen(false);
                  }}
                  
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                  className="w-full flex items-start p-3 bg-white rounded-lg shadow-sm hover:bg-gray-100"
                >
                  <img
                    src={doc.ImgUrl}
                    alt={doc.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-start text-base text-menavy">
                      {doc.name}
                    </p>
                    <p className="font-medium text-start text-xs text-gray-500">
                      {doc.specialization} — {doc.city}
                    </p>
                  </div>
                </motion.button>
              ))}

            {search && matches.length === 0 && (
              <motion.p
                key="no-doctor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-gray-400 px-3"
              >
                No doctors found.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Existing conversations */}
        <div className="flex flex-col gap-2">
          {conversations.map((c) => (
          <Conversation
          key={c._id}
          conversation={c}
          currentUserId={myId} // ✅ CORRECT
          doctors={doctors}
          patients={[]} // You can pass real patients if needed
          onClick={() => {
            openConversation(c);
            setSidebarOpen(false);
          }}
        />
          ))}
        </div>
      </aside>

      {/* Chat panel */}
      <main className="flex-1 flex flex-col p-4 ml-16 sm:ml-0">
        <div className="flex-1 bg-white border rounded-xl p-6 overflow-y-auto">
          {messages.length ? (
            messages.map((m, i) => (
              <Message key={i} own={m.sender === myId} text={m.text} createdAt={m.createdAt} />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-20">
              Start a conversation
            </p>
          )}
        </div>

        {/* Message input */}
        <div className="flex mt-4 gap-3 items-end">
          <textarea
            rows={1}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder="Type a message"
            className="flex-1 px-4 py-3 border rounded-lg resize-none max-h-48 focus:ring-menavy"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-menavy text-white rounded-lg hover:bg-mepale shadow-md"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
// ──────────────────────────────────────
