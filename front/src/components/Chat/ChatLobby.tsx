// ChatLobby.tsx
"use client";
import React, { useState, useEffect } from "react";
import ChatRoom from "@/components/Chat/ChatRoom";
import { useSocketID } from "@/hooks/useSocketID";
import useSocketStore from "@/store/socketStore";
import useRoomStore from "@/store/roomStore";
import useMessageStore from "@/store/messageStore";
import Select from "react-select";
interface Message {
  userId: string;
  content: string;
  roomName: string;
  date: Date;
}
interface SelectList {
  label: string;
  value: string;
}
export default function ChatLobby() {
  const { socket, onBot } = useSocketStore();
  const { onRoom, inRoom, setRoom } = useRoomStore();
  const { messages } = useMessageStore();
  const [roomList, setRoomList] = useState<Message[]>([]);

  //상대방 리스트 요청
  const socketIDList = useSocketID();

  //셀렉트 선택시 UI변화
  const handleChange = (selected: SelectList | null) => {
    const idList: string[] = [socket.id, selected?.value];
    let sortedIdList = idList.sort();
    setRoom(`${sortedIdList[0]}___${sortedIdList[1]}`);
    inRoom();
  };

  //대화방 목록 선택시 변화
  const selectRoomName = (selected: string) => {
    setRoom(selected);
    inRoom();
  };

  // 중복되지 않은 roomName의 원소만 추출

  useEffect(() => {
    const uniqueRooms: Message[] = [...messages]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .reduce((acc: Message[], current) => {
        const x = acc.find((item) => item.roomName === current.roomName);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
    //방별 최신 메세지 필터링.
    uniqueRooms.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setRoomList([...uniqueRooms]);
  }, [messages]);

  return (
    <div>
      <div
        className={
          (onBot ? "" : "hidden") +
          "z-41 bg-blue-200 m-1 p-1 overflow-y-auto h-64" +
          (!onRoom ? "" : " hidden")
        }
      >
        <Select
          className="col-span-2 p-1 "
          options={socketIDList
            .filter((elem: string) => {
              return elem != socket?.id;
            })
            .map((element: string) => ({
              label: element,
              value: element,
            }))}
          onChange={handleChange}
          isSearchable={true}
          placeholder="대화상대찾기"
        />
        {roomList?.map((element: any, index: any) => (
          <div
            key={index}
            onClick={() => selectRoomName(element.roomName)}
            className="grid grid-rows-2  gap-1"
          >
            <div className="row-span-1">
              {element.roomName
                .split("___")
                .filter((b: any) => {
                  return (
                    b != socket?.id &&
                    element.roomName.split("___").includes(socket?.id)
                  );
                })
                .join(",")}
              님과 대화
            </div>
            <div className="row-span-1">{element.content}</div>
          </div>
        ))}
      </div>
      <ChatRoom />
    </div>
  );
}
