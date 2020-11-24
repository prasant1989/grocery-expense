const BASE_URL = "https://powerful-shelf-47496.herokuapp.com";
const apiRequest = (url, data) => {
  return fetch(BASE_URL + url, data).then((response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response.json());
    }
    Promise.resolve(response.json()).then((responseInJson) => {
      return Promise.reject(responseInJson.error);
    });
  });
};

export default apiRequest;
