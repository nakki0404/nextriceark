function loadServer() {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/load")
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

export default loadServer;
