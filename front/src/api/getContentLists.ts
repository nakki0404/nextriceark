import type { ContentLists } from "@/types/ContentLists";

function getContentLists(): Promise<ContentLists[]> {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/load")
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
