//socketStore.ts
import { create } from "zustand";
// import type { SocketState } from "@/types/SocketState";

interface RoomState {
  roomName: string | null;
  onRoom: boolean;
  setRoom: (payload: string) => void;
  inRoom: () => void;
  outRoom: () => void;
}

const useRoomStore = create<RoomState>()((set) => ({
  roomName: null,
  onRoom: false,

  setRoom: (payload: string) => {
    set(() => ({ roomName: payload }));
  },
  inRoom: () => {
    set(() => ({ onRoom: true }));
  },
  outRoom: () => {
    set(() => ({ onRoom: false }));
  },
}));
export default useRoomStore;
