"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setSocket: React.Dispatch<React.SetStateAction<any>>;
};
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  setIsConnected: () => {},
  setSocket: () => {},
});
export const useSocket = () => {
  return useContext(SocketContext);
};
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // useEffect(() => {
  //   if (isConnected) {
  //     console.log(1);
  //   } else {
  //     console.log(2);
  //   }
  // }, [isConnected]);
  // useEffect(() => {
  //   if (!socket) {
  //     return;
  //   }
  //   socket.on("disconnect", async () => {
  //     setIsConnected(false);
  //   });
  // }, []);
  // useEffect(() => {
  //   const socketInstance = io("http://localhost:3001", {
  //     withCredentials: true,
  //   });
  //   socketInstance.on("connect", async () => {
  //     setIsConnected(true);
  //   });
  //   setSocket(socketInstance);
  //   return () => {
  //     socketInstance.disconnect();
  //   };
  // }, []);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, setIsConnected, setSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
