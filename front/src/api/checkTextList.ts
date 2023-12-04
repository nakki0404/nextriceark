import axios from "axios";
// const deleteTextList = async (_id: string, FakePassWord?: string) => {

const checkTextList = async (obj: any) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/Board/check?_id=${obj.slug}&InputFakePassWord=${obj.input}&ID=${obj.ID}`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
export default checkTextList;
