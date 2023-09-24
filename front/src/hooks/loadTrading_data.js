//./components/loadTrading_data.js

function loadTradingData() {
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

export default loadTradingData;
