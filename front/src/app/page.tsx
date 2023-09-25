export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Header /> */}
      <div className="text-yellow-300 text-9xl">Rice Ark</div>
      <div className="flex flex-row flex justify-around">
        <div className="box-border h-60 w-60 p-4 border-8 grid grid-cols-1 gap-2 justify-items-center m-5">
          <div className="">컨텐츠 보상, 상자의 가격을 골드로 환산합니다.</div>
          <button className="box-border h-20 w-20 p-1 border-4 ">
            재화 계산기
          </button>
        </div>
        <div className="box-border h-60 w-60 p-4 border-8 grid grid-cols-1 gap-2 justify-items-center m-5">
          <div className="">컨텐츠 보상, 상자의 가격을 골드로 환산합니다.</div>
          <button className="box-border h-20 w-20 p-1 border-4 ">
            재화 계산기
          </button>
        </div>
      </div>
    </main>
  );
}
