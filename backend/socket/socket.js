import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5001", "https://chat-app-yt.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  // User joins with userId for socket mapping
  socket.on("setup", (userId) => {
    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(`✅ User ${userId} mapped to socket ${socket.id}`);
    }
  });

  // Join a conversation room
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`👥 User joined conversation: ${conversationId}`);
  });

  // Send message and emit to room
  socket.on("sendMessage", (message) => {
    const { conversationId, receiverId } = message;

    // Emit to conversation room
    io.to(conversationId).emit("newMessage", message);
    console.log(`📩 Message sent in conversation: ${conversationId}`);

    // Notify receiver if online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", message);
      console.log(`🔔 Notification sent to user: ${receiverId}`);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const userId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    );
    if (userId) {
      delete userSocketMap[userId];
      console.log(`❌ User ${userId} disconnected: ${socket.id}`);
    }
  });
});

export { app, io, server };
