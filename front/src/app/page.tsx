import Link from "next/link";
import Image from "next/image";
import riceimage from "@/asset/png/icons8-rice-64.png";
import calculatorimage from "@/asset/png/icons8-calculator-64.png";
import loginimage from "@/asset/png/icons8-login-64.png";
import logoutimage from "@/asset/png/icons8-logout-64.png";
import statisticimage from "@/asset/png/icons8-statistic-64.png";
import coinimage from "@/asset/png/icons8-coin-64.png";
import recycleimage from "@/asset/png/icons8-recycle-64.png";
import recycleeximage from "@/asset/png/recycle-ex.jpg";
import calculatoreximage from "@/asset/png/calculator-ex.png";
import statisticeximage from "@/asset/png/statistic-ex.jpg";
import coineximage from "@/asset/png/coin-ex.png";

export default function Home() {
  return (
    <div className="flex flex-col space-y-16">
      <div className="text-7xl p-8 flex text-yellow-300 sm:text-8xl sm:p-16 justify-center">
        쌀로아
      </div>

      <div className="flex flex-col p-4 sm:flex-row  justify-center">
        <div className="group">
          <Link href="/Calculator/Maker" className=" m-4 flex justify-center ">
            <div className="box-border h-24 w-48 border-8 bg-yellow-200 border-yellow-100 border-r-yellow-300 border-b-yellow-300 flex flex-col shadow-2xl hover:bg-yello-50 ">
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
          <div className="hidden opacity-0 group-hover:opacity-100 group-hover:block transition duration-500">
            <>컨텐츠 보상, 상자의 값을 골드로 환산 합니다</>
            <Image
              src={calculatoreximage}
              alt="calculator icon by Icons8"
              title="calculator icon by Icons8"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="group">
          <Link
            href="/Statistics/Summary"
            className=" m-4 flex justify-center "
          >
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
          <div className="hidden opacity-0 group-hover:opacity-100 group-hover:block transition duration-500">
            <>거래소의 각종 통계와 그래프입니다</>
            <Image
              src={statisticeximage}
              alt="calculator icon by Icons8"
              title="calculator icon by Icons8"
              width={400}
              height={400}
            />
          </div>
        </div>
        {/* <Link href="/Statistics/Summary" className=" m-4 flex justify-center ">
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
        </Link> */}
        <div className="group">
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
          <div className="hidden opacity-0 group-hover:opacity-100 group-hover:block transition duration-500">
            <>각종 주화의 개당 골드가치를 보여줍니다</>
            <Image
              src={coineximage}
              alt="calculator icon by Icons8"
              title="calculator icon by Icons8"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="group">
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
          <div className="hidden opacity-0 group-hover:opacity-100 group-hover:block transition duration-500">
            <>안쓰는 장비로 부터 새 조합을 찾아줍니다</>
            <Image
              src={recycleeximage}
              alt="calculator icon by Icons8"
              title="calculator icon by Icons8"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
