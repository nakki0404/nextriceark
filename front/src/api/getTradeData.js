//./components/loadTrading_data.js

function getTradeData() {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/trade")
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

export default getTradeData;
