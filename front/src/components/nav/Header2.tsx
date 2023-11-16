"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header2() {
  const pathname = usePathname();
  const isCurrentPage = (targetPath: string) => pathname.includes(targetPath);

  return (
    <div className="bg-yellow-50 flex flex-row justify-evenly ">
      {pathname.includes("Calculator") ? (
        <>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Calculator/Maker")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Calculator/Maker" className={`flex flex-row`}>
              <div className="text-xl">재화계산기</div>
            </Link>
          </button>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Calculator/Total")
                ? "shadow-xl bg-yellow-200 rounded-lg "
                : ""
            }`}
          >
            <Link
              href="/Calculator/Total"
              className={`flex flex-row ${
                isCurrentPage("/Calculator/Total") ? "shadow" : ""
              }`}
            >
              <div className="text-xl">전체목록</div>
            </Link>
          </button>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Calculator/Info")
                ? "shadow-xl bg-yellow-200 rounded-lg "
                : ""
            }`}
          >
            <Link href="/Calculator/Info" className="flex flex-row">
              <div className="text-xl">상세보기</div>
            </Link>
          </button>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Calculator/Editer")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Calculator/Editer" className="flex flex-row">
              <div className="text-xl">수정하기</div>
            </Link>
          </button>
        </>
      ) : pathname.includes("Statistics") ? (
        <>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Statistics/Summary")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Statistics/Summary" className="flex flex-row">
              <div className="text-xl">요약</div>
            </Link>
          </button>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Statistics/Search")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Statistics/Search" className="flex flex-row">
              <div className="text-xl">단일검색</div>
            </Link>
          </button>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Statistics/Comparison")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Statistics/Comparison" className="flex flex-row">
              <div className="text-xl">전일비교</div>
            </Link>
          </button>
        </>
      ) : pathname.includes("Coin") ? (
        <>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Coin/Blood")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Coin/Blood" className="flex flex-row">
              <div className="text-xl">실마엘 혈석</div>
            </Link>
          </button>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Coin/Brave")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Coin/Brave" className="flex flex-row">
              <div className="text-xl">용기의 주화</div>
            </Link>
          </button>
          <button
            className={`flex flex-row ${
              isCurrentPage("/Coin/Pirate")
                ? "shadow-xl bg-yellow-200 rounded-lg"
                : ""
            }`}
          >
            <Link href="/Coin/Pirate" className="flex flex-row">
              <div className="text-xl">해적 주화</div>
            </Link>
          </button>
        </>
      ) : pathname.includes("Recycle") ? (
        <>
          <>이 페이지는 pc 환경에서 이용해주세요.</>
        </>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}
