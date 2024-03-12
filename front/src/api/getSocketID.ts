//getSocketID

import axios from "axios";
export const getSocketID = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/SocketID`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
