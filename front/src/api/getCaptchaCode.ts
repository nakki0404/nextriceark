import axios from "axios";
export const getCaptchaCode = async () => {
  const { data } = await axios.get<number>(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/captchaCode`
  );
  return data;
};
//쿼리 함수 입니다.
