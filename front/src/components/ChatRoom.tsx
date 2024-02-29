"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "@/components/socket-provider";

interface message {
  userId: string;
  content: string;
  roomName: string;
}

export default function ChatRoom({
  sendDataToParent,
  sendDataToParent2,
  waitingRoomActive,
  roomName,
}: any) {
  // useEffect(() => {
  //   const savedData: message[] = sessionStorage.getItem("chat");
  //   if (savedData) {
  //     setMessages(JSON.parse(savedData));
  //   }
  //   const savedData2: string = sessionStorage.getItem("socketid");
  //   if (savedData2) {
  //     setUserId(JSON.parse(savedData2));
  //   }
  // }, []);
  const [currentRoomName, setCurrentRoomName] = useState<string | null>(null);

  const [roomList, setRoomList] = useState<string[] | null>(null);

  const [messages, setMessages] = useState<message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isConnected } = useSocket();
  const [userId, setUserId] = useState<string>("");
  const handleClick = () => {
    sendDataToParent(true);
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("chat2", (data: any) => {
      data.userId != socket.id && socket.emit("join", data.roomName);
      setMessages((prevList: any) => [...prevList, ...[data]]);
      setUserId(socket.id);
      setRoomList(data.roomName);
      data.roomName != null && setCurrentRoomName(data.roomName);
      // console.log(data);
      sendDataToParent2(data);
    });
    // messages.length > 0 &&
    //   sessionStorage.setItem("chat", JSON.stringify(messages));
    // socket.id != undefined &&
    //   sessionStorage.setItem("socketid", JSON.stringify(socket.id));
    return () => {
      socket.off("chat2");
    };
  }, [socket, messages]);
  useEffect(() => {
    if (!socket) {
      return;
    }
    setCurrentRoomName(roomName);
  }, [roomName]);
  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let chatdata = {
      roomName: currentRoomName ? currentRoomName : roomName,
      message: currentMessage,
      date: new Date(),
      id: socket.id,
    };
    console.log(chatdata);
    await socket.emit("chat", chatdata);
    setCurrentMessage("");
  };
  const chatContainerRef = useRef<any>(null);
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const leaveRoom = () => {
    socket.emit("leaveRoom", currentRoomName);

    sendDataToParent(true);
  };

  return (
    <div
      className={
        "z-50 bg-blue-200 m-1 p-1 opacity-0 " +
        (waitingRoomActive ? "  " : "transition duration-500 opacity-100")
      }
    >
      <div className="flex flex-row justify-between ">
        <button onClick={handleClick}>뒤로가기</button>
        <div onClick={leaveRoom}>나가기</div>
      </div>
      {/* <div className="overflow-y-auto h-64"> */}
      {/* <div className="grid grid-rows-3 grid-flow-col gap-1"> */}
      {/* <div className="row-span-3">이미지1</div>
          <div className="col-span-2">이름</div>
          <div className="col-span-2">내용</div>
          <div className="row-span-3">시간 확인유무 </div> */}
      {/* </div> */}
      {/* </div> */}
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
                  (message.userId !== userId
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
