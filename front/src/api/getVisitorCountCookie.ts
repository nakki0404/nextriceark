import axios from "axios";
export const getVisitorCountCookie = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/VisitorCount`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
