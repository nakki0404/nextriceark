import { useQuery } from "@tanstack/react-query";
import { getCaptchaCode } from "@/api/getCaptchaCode";
export const useCaptchaCodeQuery = () => {
  const { data, error } = useQuery<number, Error>({
    queryKey: ["captchaCode"],
    queryFn: getCaptchaCode,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
  if (error) {
    console.error("오류 발생:", error.message);
    throw new Error("오류 발생!! 페이지를 새로고침 해주세요.");
  }
  return { captchaCode: data! };
};
//쿼리 설정을 통해 5분마다 재발급 받도록 합니다.
