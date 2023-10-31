import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Header /> */}
      <div className="text-yellow-300 text-9xl">Rice Ark</div>
      <div className="flex flex-row flex justify-around">
        <div className="box-border h-60 w-60 p-4 border-8 grid grid-cols-1 gap-2 justify-items-center m-5">
          <div className="">컨텐츠 보상, 상자의 가격을 골드로 환산합니다.</div>
          <Link href="/Calculator/Maker" className="flex flex-row">
            <button className="box-border h-20 w-20 p-1 border-4 ">
              재화 계산기
            </button>
          </Link>
        </div>
        {/* <div className="box-border h-60 w-60 p-4 border-8 grid grid-cols-1 gap-2 justify-items-center m-5">
          <div className="">통계통계통계통계통계</div>
          <Link href="/Statistics/Summary" className="flex flex-row">
            <button className="box-border h-20 w-20 p-1 border-4 ">통계</button>
          </Link>
        </div> */}
        <div className="box-border h-60 w-60 p-4 border-8 grid grid-cols-1 gap-2 justify-items-center m-5">
          <div className="">주화 효율주화 효율</div>
          <Link href="/Coin/Blood" className="flex flex-row">
            <button className="box-border h-20 w-20 p-1 border-4 ">
              주화 효율
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
