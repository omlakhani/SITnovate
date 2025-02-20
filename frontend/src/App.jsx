import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

// Create Socket Context
export const SocketContext = createContext();

function App() {
	const { authUser } = useAuthContext();
	const [socket, setSocket] = useState(null);

	// Initialize socket connection
	useEffect(() => {
		if (authUser) {
			const newSocket = io("https://chat-app-yt.onrender.com", {
				withCredentials: true,
				transports: ["websocket", "polling"],
			});
			setSocket(newSocket);

			newSocket.emit("setup", authUser._id);
			console.log(`🟢 Socket connected for user: ${authUser._id}`);

			return () => {
				newSocket.disconnect();
				console.log("🔴 Socket disconnected.");
			};
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={socket}>
			<div className='p-4 h-screen flex items-center justify-center'>
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				</Routes>
				<Toaster />
			</div>
		</SocketContext.Provider>
	);
}

export default App;
