// src/socket.js
import { io } from "socket.io-client";

// Connect to your backend Socket.IO server
const socket = io("ws://localhost:8080", {
  withCredentials: true,
});

export default socket;
