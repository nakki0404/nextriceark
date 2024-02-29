//./app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/nav/Header";
import Footer from "../components/nav/Footer";

import { SocketProvider } from "@/components/socket-provider";

import UpStore from "../hooks/UpStore";
import ReduxProvider from "@/store/reduxprovider";
import Header2 from "@/components/nav/Header2";
import ChatBot from "@/components/ChatBot";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/hooks/api/queryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "쌀로아",
  description: "재화계산기, 거래소통계, 주화효율표, 악세조합기를 제공합니다",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <UpStore />
            <div className="relative">
              <div className="fixed top-0 left-0 right-0 z-10">
                <Header />
                <Header2 />
              </div>
              <div className="my-8">{children}</div>
              <SocketProvider>
                <ChatBot />
              </SocketProvider>

              <div className="fixed bottom-0 left-0 right-0 z-10">
                <Footer />
              </div>
            </div>
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
