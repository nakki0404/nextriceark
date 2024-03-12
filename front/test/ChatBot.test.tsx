// ChatBot.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Jest DOM 확장 라이브러리 추가
import ChatBot from "@/components/Chat/ChatBot";

// Mocked socketStore
jest.mock("@/store/socketStore", () => ({
  __esModule: true,
  default: () => ({
    socket: {},
    isConnected: true,
    connectSocket: jest.fn(),
    disConnectSocket: jest.fn(),
    onBot: false,
    minimizeBot: jest.fn(),
    maximizeBot: jest.fn(),
  }),
}));
const mockSocketStore = require("@/store/socketStore").default();

describe("ChatBot Component", () => {
  test("renders without crashing", () => {
    render(<ChatBot />);
  });

  test("clicking on component when connected should maximize bot", () => {
    const { container } = render(<ChatBot />);

    fireEvent.click(container.firstChild!);
    expect(mockSocketStore.connectSocket).toHaveBeenCalled(); // You may need to import connectSocket from your socketStore mock
  });

  test("clicking on minimize button should minimize bot", () => {
    const { getByText } = render(<ChatBot />);
    const minimizeButton = getByText("최소화");
    fireEvent.click(minimizeButton);
    expect(mockSocketStore.minimizeBot).toHaveBeenCalled(); // You may need to import minimizeBot from your socketStore mock
  });

  test("clicking on close button when connected should disconnect socket", () => {
    const { getByText } = render(<ChatBot />);
    const closeButton = getByText("종료");
    fireEvent.click(closeButton);
    expect(mockSocketStore.disConnectSocket).toHaveBeenCalled(); // You may need to import disConnectSocket from your socketStore mock
  });
});
