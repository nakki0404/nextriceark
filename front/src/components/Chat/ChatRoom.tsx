"use client";
import React, { useState, useEffect, useRef } from "react";
import useSocketStore from "@/store/socketStore";
import useRoomStore from "@/store/roomStore";
import useMessageStore from "@/store/messageStore";

export default function ChatRoom() {
  const { socket } = useSocketStore();
  const { onRoom, inRoom, outRoom, roomName } = useRoomStore();
  const { messages, addMessage } = useMessageStore();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("chat2", (data: any) => {
      data.userId != socket.id && socket.emit("join", data.roomName);
      addMessage(data);
    });
    return () => {
      socket.off("chat2");
    };
  }, [socket, messages]);
  //기능 방에서 대화를 표시.

  //메세지를 서버로 보냄.
  const [currentMessage, setCurrentMessage] = useState("");
  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let chatdata = {
      roomName: roomName,
      message: currentMessage,
      date: new Date(),
      id: socket.id,
    };
    await socket.emit("chat", chatdata);
    setCurrentMessage("");
  };

  const chatContainerRef = useRef<any>(null);
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomName);
    outRoom();
  };

  return (
    <div
      className={
        "z-50 bg-blue-200 m-1 p-1 opacity-0 " +
        (!onRoom ? "  " : "transition duration-500 opacity-100")
      }
    >
      <div className="flex flex-row justify-between ">
        <button onClick={() => outRoom()}>뒤로가기</button>
        <div onClick={leaveRoom}>나가기</div>
      </div>

      <div>
        <div className="space-y-4 overflow-y-auto h-64">
          {messages
            .filter((e) => {
              return e.roomName == roomName;
            })
            .map((message, index) => (
              <div
                key={index}
                className={
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm " +
                  (message.userId !== socket.id
                    ? "bg-zinc-100"
                    : "ml-auto bg-blue-400 text-white")
                }
              >
                {message.userId}:{message.content}
              </div>
            ))}
          <div ref={chatContainerRef}></div>
        </div>
        <form className="flex w-full items-center space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          ></input>
          <button
            type="submit"
            onClick={(e) => sendMessage(e)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white shadow hover:bg-primary/90 h-9 w-9"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
