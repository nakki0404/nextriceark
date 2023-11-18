//./app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/nav/Header";
import Footer from "../components/nav/Footer";

import UpStore from "../hooks/UpStore";
import ReduxProvider from "@/store/reduxprovider";
import Header2 from "@/components/nav/Header2";

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
        <ReduxProvider>
          <UpStore />
          <div className="relative">
            <div className="fixed top-0 left-0 right-0 z-10">
              <Header />
              <Header2 />
            </div>
            <div className="my-8">{children}</div>
            <div className="fixed bottom-0 left-0 right-0 z-10">
              <Footer />
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
