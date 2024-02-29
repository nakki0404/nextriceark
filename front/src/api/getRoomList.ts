import axios from "axios";
export const getRoomList = async (socketid) => {
  let idData = { id: socketid };
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/RoomList`,
      idData,
      { withCredentials: true }
    );

    return { data };
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
