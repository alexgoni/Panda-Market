import HTTPClient from "utils/HTTPClient";

const httpClient = new HTTPClient({ baseUrl: process.env.REACT_APP_BASE_URL });

export default httpClient;
