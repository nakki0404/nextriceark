"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import riceimage from "@/asset/png/icons8-rice-48.png";
import calculatorimage from "@/asset/png/icons8-calculator-48.png";
import loginimage from "@/asset/png/icons8-login-48.png";
import logoutimage from "@/asset/png/icons8-logout-48.png";
import statisticimage from "@/asset/png/icons8-statistic-48.png";
import coinimage from "@/asset/png/icons8-coin-48.png";
import recycleimage from "@/asset/png/icons8-recycle-48.png";
import noteimage from "@/asset/png/icons8-note-48.png";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppSelector } from "@/store/store";
import { setloginstate } from "@/store/slices/loginstate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function Header() {
  const loginstate = useAppSelector((state: any) => state.loginstatereducer);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const savedData: any = localStorage.getItem("localStorageKey5");
    if (savedData) {
      // console.log(JSON.parse(savedData));
      dispatch(setloginstate(JSON.parse(savedData)));
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("localStorageKey5");
    localStorage.removeItem("token");
    dispatch(setloginstate({ isLogin: false, ID: "" }));
  };
  const pathname = usePathname();
  const isCurrentPage = (targetPath: string) => pathname.includes(targetPath);
  return (
    <div className="bg-yellow-50 flex flex-row justify-between">
      <div>
        <Link
          href="/"
          className="flex flex-row  transition hover:bg-yellow-300 duration-500"
        >
          <Image
            src={riceimage}
            alt="rice icon by Icons8"
            title="rice icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl hidden md:table-cell ">쌀로아</div>
        </Link>
      </div>

      <div>
        <button
          className={`flex flex-row ${
            isCurrentPage("/Calculator") ? " bg-yellow-300 rounded-lg" : ""
          } transition hover:bg-yellow-300 hover:shadow-xl duration-500`}
        >
          <Link href="/Calculator/Maker" className="flex flex-row">
            <Image
              src={calculatorimage}
              alt="calculator icon by Icons8"
              title="calculator icon by Icons8"
              width={32}
              height={32}
            />
            <div className="text-xl hidden md:table-cell">재화계산기</div>
          </Link>
        </button>
      </div>
      <div>
        <button
          className={`flex flex-row ${
            isCurrentPage("/Statistics") ? " bg-yellow-300 rounded-lg" : ""
          } transition hover:bg-yellow-300 duration-500`}
        >
          <Link href="/Statistics/Summary" className="flex flex-row ">
            <Image
              src={statisticimage}
              alt="statistic icon by Icons8"
              title="statistic icon by Icons8"
              width={32}
              height={32}
            />
            <div className="text-xl hidden md:table-cell">거래소통계</div>
          </Link>
        </button>
      </div>
      <div>
        <button
          className={`flex flex-row ${
            isCurrentPage("/Coin") ? " bg-yellow-300 rounded-lg" : ""
          } transition hover:bg-yellow-300 duration-500`}
        >
          <Link href="/Coin/Blood" className="flex flex-row">
            <Image
              src={coinimage}
              alt="coin icon by Icons8"
              title="coin icon by Icons8"
              width={32}
              height={32}
            />
            <div className="text-xl hidden md:table-cell">주화효율</div>
          </Link>
        </button>
      </div>
      <div>
        <button
          className={`flex flex-row ${
            isCurrentPage("/Recycle") ? " bg-yellow-300 rounded-lg" : ""
          } transition hover:bg-yellow-300 duration-500`}
        >
          <Link href="/Recycle" className="flex flex-row">
            <Image
              src={recycleimage}
              alt="coin icon by Icons8"
              title="coin icon by Icons8"
              width={32}
              height={32}
            />
            <div className="text-xl hidden md:table-cell">악세조합기</div>
          </Link>
        </button>
      </div>
      <div>
        <Link
          href="/Board"
          className="flex flex-row  transition hover:bg-yellow-300 duration-500"
        >
          <Image
            src={noteimage}
            alt="rice icon by Icons8"
            title="rice icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl hidden md:table-cell ">게시판</div>
        </Link>
      </div>

      {!loginstate.isLogin ? (
        <button
          className={`flex flex-row ${
            isCurrentPage("/Login") ? " bg-yellow-300 rounded-lg" : ""
          } transition hover:bg-yellow-300 duration-500`}
        >
          <Link href="/Login" className="flex flex-row">
            <Image
              src={loginimage}
              alt="login icon by Icons8"
              title="login icon by Icons8"
              width={32}
              height={32}
            />
            <div className="text-xl hidden md:table-cell">로그인</div>
          </Link>
        </button>
      ) : (
        <button>
          <div
            className="flex flex-row  transition hover:bg-yellow-300 duration-500"
            onClick={logOut}
          >
            <Image
              src={logoutimage}
              alt="logout icon by Icons8"
              title="logout icon by Icons8"
              width={32}
              height={32}
            />
            <div className="text-xl hidden md:table-cell">로그아웃</div>
          </div>
        </button>
      )}
    </div>
  );
}
