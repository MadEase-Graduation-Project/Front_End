import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "@/component/Conversation/Conversation";
import Message from "@/component/Message/Message";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { fetchMYData } from "@/store/slices/userSlice";

import { selectMyDetails } from "@/store/selectors/userSelectors";

import { Menu, X } from "lucide-react";
import { selectPatientsLoading } from "@/store/selectors";
import { fetchAllPatients } from "@/store/slices/patientSlice";

/* ───────────────────────────────────── component */
export default function Messages() {
  /* UI & data state */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const [incoming, setIncoming] = useState(null);

  /* Redux — patients list & my profile */
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const dispatch = useDispatch();

  const { patients: patients, loading, error } = useSelector((state) => state.patients);
  const myDetails = useSelector(selectMyDetails);  

  /* IDs & token */
  const myId = myDetails?._id;
  const token = localStorage.getItem("token");

  /* Socket.IO */
  const socket = io("http://localhost:8080", {
    withCredentials: true,
  });

  /* ----- 1. Load my profile + public patients on mount ------- */
  useEffect(() => {
    if (!myDetails) dispatch(fetchMYData());
    dispatch(fetchAllPatients());
  }, [dispatch, myDetails]);

  /* ----- 2. Register to Socket.IO once we know myId --------- */
  useEffect(() => {
    if (!myId) return;

    socket.emit("addUser", myId);

    const onUsers = (users) => console.log("online:", users);
    const onMessage = (data) =>
      setIncoming({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        conversationId: selectedConv?._id,
      });

    socket.on("getUsers", onUsers);
    socket.on("getMessage", onMessage);

    return () => {
      socket.off("getUsers", onUsers);
      socket.off("getMessage", onMessage);
    };
  }, [myId, selectedConv?._id]);

  /* push incoming msg into chat if it belongs there */
  useEffect(() => {
    if (incoming && selectedConv?._id === incoming.conversationId) {
      setMessages((prev) => [...prev, incoming]);
    }
  }, [incoming, selectedConv]);

  /* ----- 3. load my conversation list once ------------------ */
  useEffect(() => {
    if (!myId) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/conversation/${myId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(await res.json());
      } catch (err) {
        console.error("load conversations:", err);
      }
    })();
  }, [myId, token]);

  /* Helpers --------------------------------------------------- */
  const openConversation = async (conv) => {
    setSelectedConv(conv);
    setReceiverId(conv.members.find((id) => id !== myId));

    try {
      const res = await fetch(`http://localhost:8080/message/${conv._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(await res.json());
    } catch (err) {
      console.error("load messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConv) return;

    const body = {
      conversationId: selectedConv._id,
      sender: myId,
      text: newMessage,
    };

    try {
      /* save to DB */
      const res = await fetch("http://localhost:8080/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const saved = await res.json();
      setMessages((m) => [...m, saved]);
      setNewMessage("");

      /* notify via socket */
      socket.emit("sendMessage", {
        senderId: myId,
        receiverId,
        text: body.text,
      });
    } catch (err) {
      console.error("send msg:", err);
    }
  };

  /* start chat with doctor or reuse existing */
  const startChat = async (doctorId) => {
    const existing = conversations.find((c) => c.members.includes(doctorId));
    if (existing) return openConversation(existing);

    try {
      const res = await fetch("http://localhost:8080/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senderId: myId, receiverId: doctorId }),
      });
      const newConv = await res.json();
      setConversations((c) => [newConv, ...c]);
      openConversation(newConv);
    } catch (err) {
      console.error("create conv:", err);
    }
  };

  /* search filter */
  const matches = search
  ? patients?.filter((d) =>
      [d?.name, d?.specialization, d?.city].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    )
  : [];

  useEffect(() => {
  if (search) {
    console.log("Filtered Patients:", matches);
  }
}, [search]);


  /* ──────────────────────────── UI */
  return (
    <div className="relative flex bg-gradient-to-br from-[#f5f7fa] to-[#e6ecf3] text-sm overflow-hidden h-[calc(100vh_-_100px)] rounded-lg">
      {/* mobile – hamburger */}
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
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        {/* close btn (mobile) */}
        <button
          className="sm:hidden mb-2 ml-auto"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-menavy">Chats</h2>

        {/* search box */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients…"
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-menavy"
        />

        {/* search results (animated) */}
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

            {search && matches.length === 0 && !loading && (
              <motion.p
                key="no-doctor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-gray-400 px-3"
              >
                No patients found.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* existing conversations */}
        <div className="flex flex-col gap-2">
          {conversations.map((c) => (
            <Conversation
              key={c._id}
              conversation={c}
              currentUserId={myId}
              patients={patients}
              onClick={() => {
                openConversation(c);
                setSidebarOpen(false);
              }}
            />
          ))}
        </div>
      </aside>

      {/* chat panel */}
      <main className="flex-1 flex flex-col p-4 ml-16 sm:ml-0">
        <div className="flex-1 bg-white border rounded-xl p-6 overflow-y-auto">
          {messages.length ? (
            messages.map((m, i) => (
              <Message key={i} own={m.sender === myId} text={m.text} />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-20">
              Start a conversation
            </p>
          )}
        </div>

        {/* message input */}
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
