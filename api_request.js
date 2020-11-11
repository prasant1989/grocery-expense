const apiRequest = (url, data) => {
    fetch(url, data).then((response) => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response.json());
        }
        return Promise.resolve(response.json()).then((responseInJson) => {
            return Promise.reject(responseInJson.error);
        });
    });
};

export default apiRequest;
