"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import calculatorimage from "@/asset/png/icons8-calculator-48.png";
import statisticimage from "@/asset/png/icons8-statistic-48.png";
import coinimage from "@/asset/png/icons8-coin-48.png";
import recycleimage from "@/asset/png/icons8-recycle-48.png";

import caculator_manual from "@/asset/png/caculator-manual.png";
import statistics_manual from "@/asset/png/statistics-manual.png";
import recycle_manual from "@/asset/png/recycle-manual.png";
import coin_manual from "@/asset/png/coin-manual.png";

import { HomePageButton } from "@/components/HomePageButton";
import { HomeScrollEvent } from "@/components/HomeScrollEvent";

export default function Home() {
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", function () {
      let scrollIndicator: HTMLElement | null = document.getElementById(
        "caculator_manual-indicator"
      );
      let scrollIndicator2: HTMLElement | null = document.getElementById(
        "statistics_manual-indicator"
      );
      let scrollIndicator3: HTMLElement | null = document.getElementById(
        "coin_manual-indicator"
      );
      let scrollIndicator4: HTMLElement | null = document.getElementById(
        "recycle_manual-indicator"
      );
      let scrollPosition = window.scrollY;

      // 스크롤 위치에 따라 scroll-indicator의 투명도를 조절합니다.
      scrollIndicator
        ? (scrollIndicator.style.opacity = scrollPosition > 250 ? "1" : "0")
        : null;
      scrollIndicator2
        ? (scrollIndicator2.style.opacity = scrollPosition > 400 ? "1" : "0")
        : null;
      scrollIndicator3
        ? (scrollIndicator3.style.opacity = scrollPosition > 700 ? "1" : "0")
        : null;
      scrollIndicator4
        ? (scrollIndicator4.style.opacity = scrollPosition > 1100 ? "1" : "0")
        : null;
    });
  }
  return (
    <div className="flex flex-col space-y-16 min-w-screen min-h-[1800px]">
      <div className="text-7xl p-8 flex text-yellow-300 sm:text-8xl sm:p-16 justify-center">
        쌀로아
      </div>
      <div className="flex flex-col p-4 sm:flex-row  justify-center">
        <HomePageButton
          url="/Calculator/Maker"
          icon={calculatorimage}
          buttonText="재화계산기"
        />
        <HomePageButton
          url="/Statistics/Summary"
          icon={statisticimage}
          buttonText="거래소통계"
        />
        <HomePageButton
          url="/Coin/Blood"
          icon={coinimage}
          buttonText="주화효율"
        />
        <HomePageButton
          url="/Recycle"
          icon={recycleimage}
          buttonText="악세조합기"
        />
      </div>

      <div className=" hidden md:block">
        {/* <HomeScrollEvent
          position={scrollPosition2}
          image={caculator_manual}
          url="/Calculator/Maker"
          icon={calculatorimage}
          buttonText="재화계산기"
        /> */}
        <div
          id="caculator_manual-indicator"
          className="  h-96 w-100%  flex items-center justify-center  opacity-0 transition-opacity duration-500 p-8 m-8"
        >
          <div>
            <div>
              <p>이 상자 얼마에요? 뭐 받아요?</p>
              <p>이 페이지는 평균가로 계산해줍니다</p>
            </div>
            <HomePageButton
              url="/Calculator/Maker"
              icon={calculatorimage}
              buttonText="재화계산기"
            />
          </div>
          <Image
            src={caculator_manual}
            alt="caculator_manual"
            title="caculator_manual"
            width={500}
            height={500}
          />
        </div>
        <div
          id="statistics_manual-indicator"
          className="  h-96 w-100%  flex items-center justify-center  opacity-0 transition-opacity duration-500 p-8 m-8"
        >
          <div>
            <div>
              <p>거래소 각종 통계</p>
            </div>
            <HomePageButton
              url="/Statistics/Summary"
              icon={statisticimage}
              buttonText="거래소통계"
            />
          </div>
          <Image
            src={statistics_manual}
            alt="statistics_manual"
            title="statistics_manual"
            width={500}
            height={500}
          />
        </div>
        <div
          id="coin_manual-indicator"
          className="  h-96 w-100%  flex items-center justify-center  opacity-0 transition-opacity duration-500 p-8 m-8"
        >
          <div>
            <div>
              <p>주화로 뭐부터 사지?</p>
              <p>혈석 용기 해적 주화 효율</p>
            </div>

            <HomePageButton
              url="/Coin/Blood"
              icon={coinimage}
              buttonText="주화효율"
            />
          </div>
          <Image
            src={coin_manual}
            alt="coin_manual"
            title="coin_manual"
            width={500}
            height={500}
          />
        </div>
        <div
          id="recycle_manual-indicator"
          className="  h-96 w-100%  flex items-center justify-center  opacity-0 transition-opacity duration-500 p-8 m-8"
        >
          <div>
            <div>
              <p>버리긴 아깝고 당장 쓸덴 없고</p>
              <p>모아둔 악세들 조합 추천</p>
            </div>

            <HomePageButton
              url="/Recycle"
              icon={recycleimage}
              buttonText="악세조합기"
            />
          </div>
          <Image
            src={recycle_manual}
            alt="recycle_manual"
            title="recycle_manual"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
