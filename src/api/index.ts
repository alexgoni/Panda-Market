import HTTPClient from "utils/HTTPClient";
import HttpError from "utils/HTTPClient/HTTPError";
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
  onError: async ({ response, originalRequest }) => {
    if (response.status !== 401) throw new HttpError("Network Error", response);

    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const url = response.url.replace(
      process.env.REACT_APP_BASE_URL as string,
      "",
    );
    const method = originalRequest?.method?.toLowerCase() as
      | "get"
      | "post"
      | "patch"
      | "delete";
    const updatedConfig = { ...originalRequest };

    try {
      const refreshTokenResponse = await postRefreshToken(refreshToken);
      setCookie({
        name: "accessToken",
        value: refreshTokenResponse.accessToken,
        time: 360_000,
      });

      const headers = new Headers(updatedConfig.headers || {});
      headers.set(
        "Authorization",
        `Bearer ${refreshTokenResponse.accessToken}`,
      );
      updatedConfig.headers = headers;

      return await httpClient[method](url, updatedConfig);
    } catch (err) {
      throw err;
    }
  },
});

export default httpClient;
