//./app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/nav/Header";
import Footer from "../components/nav/Footer";

import UpStore from "../utils/UpStore";
import ReduxProvider from "@/store/reduxprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiceArk",
  description: "쌀로아입니다",
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
