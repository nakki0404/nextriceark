//socketStore.ts
import { create } from "zustand";
// import type { SocketState } from "@/types/SocketState";
interface Message {
  userId: string;
  content: string;
  roomName: string;
  date: Date;
}
interface MessageState {
  messages: Message[];
  lastMessage: Object | any;
  addMessage: (payload: Message) => void;
}
const useMessageStore = create<MessageState>()((set) => ({
  messages: [],
  lastMessage: null,
  addMessage: (payload) => {
    set((state) => ({
      messages: [...state.messages, payload],
      lastMessage: { ...payload },
    }));
  },
}));
export default useMessageStore;
