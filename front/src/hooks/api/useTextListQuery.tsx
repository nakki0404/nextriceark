import { useQuery } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

import getTextList from "@/api/getTextList";
import type { Text } from "@/types/Text";
export const useTextListQuery = () => {
  const { data, error } = useSuspenseQuery<Text[], Error>({
    queryKey: ["textList"],
    queryFn: getTextList,
    gcTime: 5 * 60 * 1000,
  });
  if (error) {
    console.error("오류 발생:", error.message);
    throw new Error("오류 발생!! 페이지를 새로고침 해주세요.");
  }
  return { TextList: data! };
};
//쿼리 설정을 통해 5분마다 재발급 받도록 합니다.
