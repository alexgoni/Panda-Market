import HTTPClient from "utils/HTTPClient";
import { getCookie, setCookie } from "utils/cookie";

// eslint-disable-next-line import/no-cycle
import { postRefreshToken } from "./auth";

const httpClient = new HTTPClient({ baseUrl: process.env.REACT_APP_BASE_URL });

httpClient.setRequestInterceptor((config) => {
  const newConfig = { ...config };
  const headers = new Headers(config.headers || {});

  const accessToken = getCookie("accessToken");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  newConfig.headers = headers;
  return newConfig;
});

httpClient.setResponseInterceptor({
  onError: async ({ error, originalRequest }) => {
    if (error.status !== 401) throw new Error("Unauthorized error");

    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const url = error.url.replace(process.env.REACT_APP_BASE_URL as string, "");
    const method = originalRequest?.method?.toLowerCase() as
      | "get"
      | "post"
      | "patch"
      | "delete";
    const updatedConfig = { ...originalRequest };

    try {
      const response = await postRefreshToken(refreshToken);
      setCookie({
        name: "accessToken",
        value: response.accessToken,
        time: 360_000,
      });

      const headers = new Headers(updatedConfig.headers || {});
      headers.set("Authorization", `Bearer ${response.accessToken}`);
      updatedConfig.headers = headers;

      return await httpClient[method](url, updatedConfig);
    } catch (err) {
      throw err;
    }
  },
});

export default httpClient;
