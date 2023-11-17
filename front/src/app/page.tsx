import Link from "next/link";
import Image from "next/image";
import riceimage from "@/asset/png/icons8-rice-64.png";
import calculatorimage from "@/asset/png/icons8-calculator-64.png";
import loginimage from "@/asset/png/icons8-login-64.png";
import logoutimage from "@/asset/png/icons8-logout-64.png";
import statisticimage from "@/asset/png/icons8-statistic-64.png";
import coinimage from "@/asset/png/icons8-coin-64.png";
import recycleimage from "@/asset/png/icons8-recycle-64.png";

import caculator_manual from "@/asset/png/caculator-manual.png";
import statistics_manual from "@/asset/png/statistics-manual.png";
import recycle_manual from "@/asset/png/recycle-manual.png";
import coin_manual from "@/asset/png/coin-manual.png";

import Homemenu from "@/components/Homemenu";

export default function Home() {
  // window.addEventListener("scroll", function () {
  //   let scrollIndicator: HTMLElement | null = document.getElementById(
  //     "caculator_manual-indicator"
  //   );
  //   let scrollIndicator2: HTMLElement | null = document.getElementById(
  //     "statistics_manual-indicator"
  //   );
  //   let scrollIndicator3: HTMLElement | null = document.getElementById(
  //     "coin_manual-indicator"
  //   );
  //   let scrollIndicator4: HTMLElement | null = document.getElementById(
  //     "recycle_manual-indicator"
  //   );
  //   let scrollPosition = window.scrollY;

  //   // 스크롤 위치에 따라 scroll-indicator의 투명도를 조절합니다.
  //   scrollIndicator
  //     ? (scrollIndicator.style.opacity = scrollPosition > 250 ? "1" : "0")
  //     : null;
  //   scrollIndicator2
  //     ? (scrollIndicator2.style.opacity = scrollPosition > 400 ? "1" : "0")
  //     : null;
  //   scrollIndicator3
  //     ? (scrollIndicator3.style.opacity = scrollPosition > 700 ? "1" : "0")
  //     : null;
  //   scrollIndicator4
  //     ? (scrollIndicator4.style.opacity = scrollPosition > 1000 ? "1" : "0")
  //     : null;
  // });
  return (
    <div className="flex flex-col space-y-16 min-w-screen min-h-screen">
      <div className="text-7xl p-8 flex text-yellow-300 sm:text-8xl sm:p-16 justify-center">
        쌀로아
      </div>
      <div className="flex flex-col p-4 sm:flex-row  justify-center">
        <Link href="/Calculator/Maker" className=" m-4 flex justify-center ">
          <div className="box-border h-24 w-48 border-8 bg-yellow-200 border-yellow-100 border-r-yellow-300 border-b-yellow-300 flex flex-col shadow-2xl ">
            <div className="flex flex-row justify-center p-4 ">
              <Image
                src={calculatorimage}
                alt="calculator icon by Icons8"
                title="calculator icon by Icons8"
                width={32}
                height={32}
              />
              <div className="text-xl  md:table-cell">재화계산기</div>
            </div>
          </div>
        </Link>
        <Link href="/Statistics/Summary" className=" m-4 flex justify-center ">
          <div className="box-border h-24 w-48 border-8 bg-yellow-200 border-yellow-100 border-r-yellow-300 border-b-yellow-300 flex flex-col shadow-2xl ">
            <div className="flex flex-row justify-center p-4 ">
              <Image
                src={statisticimage}
                alt="statistic icon by Icons8"
                title="statistic icon by Icons8"
                width={32}
                height={32}
              />
              <div className="text-xl  md:table-cell">거래소통계</div>
            </div>
          </div>
        </Link>
        <Link href="/Coin/Blood" className=" m-4 flex justify-center">
          <div className="box-border h-24 w-48 border-8 bg-yellow-200 border-yellow-100 border-r-yellow-300 border-b-yellow-300 flex flex-col shadow-2xl">
            <div className="flex flex-row justify-center p-4 ">
              <Image
                src={coinimage}
                alt="coin icon by Icons8"
                title="coin icon by Icons8"
                width={32}
                height={32}
              />
              <div className="text-xl  md:table-cell">주화효율</div>
            </div>
          </div>
        </Link>
        <Link href="/Recycle" className=" m-4 flex justify-center">
          <div className="box-border h-24 w-48 border-8 bg-yellow-200 border-yellow-100 border-r-yellow-300 border-b-yellow-300  flex flex-col shadow-2xl">
            <div className="flex flex-row justify-center p-4 ">
              <Image
                src={recycleimage}
                alt="coin icon by Icons8"
                title="coin icon by Icons8"
                width={32}
                height={32}
              />
              <div className="text-xl  md:table-cell">악세조합기</div>
            </div>
          </div>
        </Link>
      </div>
      <Homemenu />
    </div>
  );
}
