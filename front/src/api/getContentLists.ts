import type { ContentLists } from "@/types/ContentLists";

function getContentLists(): Promise<ContentLists[]> {
  return fetch(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/load")
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<ContentLists[]>;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default getContentLists;
// 경기도 화성시
// 남양읍 남양로
// 337-10 // dx서비스 센터
// 연락처 고객센터
// //
// 이름 연락처 증상//
