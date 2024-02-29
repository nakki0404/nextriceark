"use client";
// ChatBot.tsx
import React, { useState, useEffect } from "react";
import ChatWaitingRoom from "@/components/ChatWaitingRoom";
import { useSocket } from "@/components/socket-provider";
import { io } from "socket.io-client";

export default function ChatBot() {
  const [active, setActive] = useState<boolean>(false);
  const { socket, isConnected, setIsConnected, setSocket } = useSocket();
  const botClass = `${
    active ? "h-96 w-96" : "h-16 w-16"
  }  bg-blue-300 rounded-lg text-black m-1 z-40 fixed bottom-5 right-2 `;

  const leaveBot = () => {
    socket.on("disconnect", () => {});
    socket.disconnect();

    active && setActive(!active);
    setIsConnected(false);
  };

  const onBot = () => {
    if (active) {
      return;
    }
    !active && setActive(!active);

    if (!isConnected) {
      const socketInstance = io("https://www.nextriceark.store", {
        withCredentials: true,
      });
      socketInstance.on("connect", async () => {});
      setIsConnected(true);

      setSocket(socketInstance);
    }
  };
  const [roomName, setRoomName] = useState<string | null>(null);

  const handleDataFromChild = (roomName: string) => {
    if (!roomName) {
      return;
    }
    setRoomName(roomName);
  };
  return (
    <div className={botClass} onClick={onBot}>
      {active ? (
        <div className="flex flex-row justify-between">
          <div className="text-black   m-1">톡톡</div>
          <div className="text-black   m-1">이용자간 랜덤채팅</div>
          <div className="flex flex-row">
            <div
              className="text-black   m-1"
              title="최소화"
              onClick={() => active && setActive(!active)}
            >
              __
            </div>
            <div className="text-black   m-1" title="종료" onClick={leaveBot}>
              X
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl m-1">톡톡</p>
      )}
      <div className={active ? "" : "hidden"}>
        <ChatWaitingRoom
          active={active}
          sendDataToParent={handleDataFromChild}
        />
      </div>
    </div>
  );
}
