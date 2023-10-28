"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header2() {
  const isCalculatorPage = true;
  const pathname = usePathname();
  return (
    <div className="bg-yellow-50 flex flex-row justify-between">
      {pathname.includes("Calculator") ? (
        <>
          <Link href="/Calculator/Maker" className="flex flex-row">
            <div className="text-xl">재화계산기</div>
          </Link>
          <Link href="/Calculator/Total" className="flex flex-row">
            <div className="text-xl">전체보기</div>
          </Link>
          <Link href="/Calculator/Info" className="flex flex-row">
            <div className="text-xl">상세보기</div>
          </Link>
        </>
      ) : pathname.includes("Statistics") ? (
        <>
          <Link href="/Statistics/Comparison" className="flex flex-row">
            <div className="text-xl">비교</div>
          </Link>
          <Link href="/Statistics/Search" className="flex flex-row">
            <div className="text-xl">개별검색</div>
          </Link>
          <Link href="/Statistics/Summary" className="flex flex-row">
            <div className="text-xl">요약</div>
          </Link>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
