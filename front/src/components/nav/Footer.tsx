"use client";
import React, { useEffect, useState } from "react";

import { useVisitorCount } from "@/hooks/useVisitorCount";

export default function Footer() {
  const { total, today } = useVisitorCount();

  return (
    <div className="bg-yellow-50 flex flex-row justify-between">
      <div className="text-xl">전체{total}</div>
      <div className="text-xl">매일 오전 1시 업데이트</div>
      <div className="text-xl">오늘{today}</div>
    </div>
  );
}
