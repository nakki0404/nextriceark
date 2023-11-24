import axios from "axios";
export const deleteCaptchaCode = (captchaCode: any) => {
  const data = axios.delete(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/captchaCode?captchaCode=${captchaCode}`
  );
  return data;
};
//쿼리 함수 입니다.
