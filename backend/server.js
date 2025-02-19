import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Debugging: Check if MongoDB URI is being read
if (!process.env.MONGO_DB_URI) {
  console.error("❌ MONGO_DB_URI is not defined. Check your .env file.");
  process.exit(1);
} else {
  console.log("✅ MongoDB URI loaded:", process.env.MONGO_DB_URI);
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, async () => {
	await connectToMongoDB();
	console.log(`🚀 Server Running on port ${PORT}`);
});
