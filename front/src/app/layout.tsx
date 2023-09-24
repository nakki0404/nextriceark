//./app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/nav/Header";
import Footer from "../components/nav/Footer";

import UpStore from "../hooks/UpStore";
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
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
