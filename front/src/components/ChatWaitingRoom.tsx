"use client";
// ChatBody.tsx
import React, { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import { useRoomList } from "@/hooks/useRoomList";
import { useSocketID } from "@/hooks/useSocketID";

import Select from "react-select";
import axios from "axios";
import { useSocket } from "@/components/socket-provider";

interface ChatBodyProps {
  active: boolean;
}
export default function ChatWaitingRoom({ active, sendDataToParent }: any) {
  // active 상태 출력
  const [waitingRoomActive, setWaitingRoomActive] = useState<boolean>(true);

  const handleDataFromChild = (data: boolean) => {
    setWaitingRoomActive(data);
  };
  const [lastChat, setlastChat] = useState<any>(null);

  const handleDataFromChild2 = (data: any) => {
    // console.log(data);
    setlastChat(data);
    //마지막 대화
  };

  const { socket, isConnected } = useSocket();

  const { socketIDList } = useSocketID();
  const { roomList } = useRoomList(socket?.id);

  const [selectedOption8, setSelectedOption8] = useState<any>("");
  const [roomName, setRoomName] = useState<string | null>(null);

  const handleChange8 = async (selected: any = {}) => {
    setSelectedOption8(selected);
    const idList = [socket.id, selected.value];
    let sortedIds = idList.sort();

    let reqBody = { data: `${sortedIds[0]}___${sortedIds[1]}` };
    setRoomName(`${sortedIds[0]}___${sortedIds[1]}`);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/SocketMakeRoom`,
        reqBody,
        { withCredentials: true }
      );
    } catch (error: any) {
      console.error("오류 발생:", error.message);
      throw error;
    }
    waitingRoomActive && setWaitingRoomActive(!waitingRoomActive);
  };

  const selectRoomName = async (selected: any = {}) => {
    setRoomName(selected);
    sendDataToParent(selected);
    waitingRoomActive && setWaitingRoomActive(!waitingRoomActive);
  };
  const [objChat, setObjChat] = useState<any>({});

  useEffect(() => {
    if (roomList != undefined && lastChat != null) {
      const newobjChat = { ...objChat };
      for (let i = 0; i < roomList.data.length; i++) {
        if (roomList.data[i] === lastChat.roomName) {
          newobjChat[roomList.data[i]] = lastChat.content; // 객체의 키-값 쌍을 직접 할당
        }
      }
      setObjChat(newobjChat);
    }
  }, [roomList, lastChat]);

  return (
    <div>
      <div
        className={
          (active ? "" : "hidden") +
          "z-41 bg-blue-200 m-1 p-1 overflow-y-auto h-64" +
          (waitingRoomActive ? "" : " hidden")
        }
      >
        <Select
          className="col-span-2 p-1 "
          options={socketIDList?.data
            .filter((elem: any) => {
              return elem != socket?.id;
            })
            .map((element: string) => ({
              label: element,
              value: element,
            }))}
          value={selectedOption8}
          onChange={handleChange8}
          isSearchable={true}
          placeholder="대화상대찾기"
        />
        {roomList?.data.map((element: any, index: any) => (
          <div
            key={index}
            onClick={() => selectRoomName(element)}
            className="grid grid-rows-2  gap-1"
          >
            <div className="row-span-1">
              {element
                .split("___")
                .filter((b: any) => {
                  return (
                    b != socket?.id && element.split("___").includes(socket?.id)
                  );
                })
                .join(",")}
              님과 대화
            </div>
            <div className="row-span-1">{objChat[element]}</div>
          </div>
        ))}
      </div>
      <ChatRoom
        sendDataToParent={handleDataFromChild}
        sendDataToParent2={handleDataFromChild2}
        waitingRoomActive={waitingRoomActive}
        roomName={roomName}
      />
    </div>
  );
}
