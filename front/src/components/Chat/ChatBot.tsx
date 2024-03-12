// ChatBot.tsx
"use client";
import React from "react";
import ChatLobby from "@/components/Chat/ChatLobby";
import useSocketStore from "@/store/socketStore";
export default function ChatBot() {
  const {
    socket,
    isConnected,
    connectSocket,
    disConnectSocket,
    onBot,
    minimizeBot,
    maximizeBot,
  } = useSocketStore();
  return (
    <div
      className={`${
        onBot ? "h-96 w-96" : "h-16 w-16"
      }  bg-blue-300 rounded-lg text-black m-1 z-40 fixed bottom-5 right-2 `}
      onClick={() => {
        isConnected ? maximizeBot() : connectSocket();
      }}
    >
      {onBot ? (
        <div className="flex flex-row justify-between">
          <div className="text-black   m-1">톡톡</div>
          <div className="text-black   m-1">이용자간 랜덤채팅</div>
          <div className="flex flex-row">
            <div
              className="text-black   m-1"
              title="최소화"
              onClick={(event) => {
                event.stopPropagation();
                minimizeBot();
              }}
            >
              __
            </div>
            <div
              className="text-black   m-1"
              title="종료"
              onClick={(event) => {
                event.stopPropagation();
                isConnected && disConnectSocket();
              }}
            >
              X
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl m-1">톡톡</p>
      )}
      <div className={onBot ? "" : "hidden"}>
        <ChatLobby />
      </div>
    </div>
  );
}
