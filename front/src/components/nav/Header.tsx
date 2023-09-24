"use client";
import Image from "next/image";
import riceimage from "../../asset/png/icons8-rice-64.png";
import calculatorimage from "../../asset/png/icons8-calculator-64.png";
import loginimage from "../../asset/png/icons8-login-64.png";
import logoutimage from "../../asset/png/icons8-logout-64.png";
import statisticimage from "../../asset/png/icons8-statistic-64.png";
import Link from "next/link";

import { useAppSelector } from "@/store/store";
import { accountLogin } from "@/store/slices/login-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function Header() {
  const loginstate = useAppSelector((state) => state.loginreducer);
  const dispatch = useDispatch<AppDispatch>();

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(accountLogin(false));
  };

  return (
    <div className="bg-yellow-50 flex flex-row justify-between">
      <div>
        <Link href="/" className="flex flex-row">
          <Image
            src={riceimage}
            alt="rice icon by Icons8"
            title="rice icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl">쌀로아</div>
        </Link>
      </div>
      <div>
        <Link href="/Calculator" className="flex flex-row">
          <Image
            src={calculatorimage}
            alt="calculator icon by Icons8"
            title="calculator icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl">계산기</div>
        </Link>
      </div>
      <div>
        <Link href="/Statistics" className="flex flex-row">
          <Image
            src={statisticimage}
            alt="statistic icon by Icons8"
            title="statistic icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl">통계</div>
        </Link>
      </div>
      {!loginstate ? (
        <Link href="/Login" className="flex flex-row">
          <Image
            src={loginimage}
            alt="login icon by Icons8"
            title="login icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl">로그인</div>
        </Link>
      ) : (
        <div className="flex flex-row" onClick={logOut}>
          <Image
            src={logoutimage}
            alt="logout icon by Icons8"
            title="logout icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl">로그아웃</div>
        </div>
      )}
    </div>
  );
}
