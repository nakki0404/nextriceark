//./components/reqServer.js
"use client";

function fetchData() {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

export default fetchData;
