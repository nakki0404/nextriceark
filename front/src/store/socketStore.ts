//socketStore.ts
import { create } from "zustand";
import { io } from "socket.io-client";

interface SocketState {
  socket: any | null;
  isConnected: boolean;
  onBot: boolean;
  connectSocket: () => void;
  disConnectSocket: () => void;
  minimizeBot: () => void;

  maximizeBot: () => void;
}

const useSocketStore = create<SocketState>()((set) => ({
  socket: null,
  isConnected: false,
  onBot: false,
  connectSocket: () => {
    const socketInstance = io(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}`.slice(0, -4),
      {
        withCredentials: true,
      }
    );
    socketInstance.on("connect", () => {});
    set(() => ({ socket: socketInstance, isConnected: true, onBot: true }));
  },
  disConnectSocket: () => {
    set((state) => {
      state.socket.on("disconnect", () => {});
      state.socket.disconnect();
      return { socket: null, isConnected: false, onBot: false };
    });
  },
  minimizeBot: () => {
    set(() => {
      return { onBot: false };
    });
  },
  maximizeBot: () => {
    set(() => {
      return { onBot: true };
    });
  },
}));
export default useSocketStore;
