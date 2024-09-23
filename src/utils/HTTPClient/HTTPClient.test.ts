import { server } from "mocks/server";

import HTTPClient from ".";
import HttpError from "./HTTPError";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("HTTPClient", () => {
  const httpClient = new HTTPClient({
    baseUrl: "https://api.test.com",
    timeout: 3000,
  });

  it("GET request - JSON 자동 변환", async () => {
    const response = await httpClient.get("/resource");
    expect(response).toStrictEqual({ message: "GET successful" });
  });

  it("POST request - JSON 자동 변환", async () => {
    const response = await httpClient.post("/resource");
    expect(response).toStrictEqual({ message: "POST successful" });
  });

  it("throw error 테스트", async () => {
    await expect(httpClient.get("/error")).rejects.toThrow();
  });

  it("request interceptor", async () => {
    httpClient.setRequestInterceptor((config) => {
      const newConfig = { ...config };
      const headers = new Headers(config.headers || {});

      headers.set("Authorization", `Bearer mock-token`);

      newConfig.headers = headers;
      return newConfig;
    });

    const response = await httpClient.get("/protected");
    expect(response).toStrictEqual({ message: "Protected Resourse" });
  });

  it("response interceptor", async () => {
    httpClient.setResponseInterceptor({
      onError: async ({ response, originalRequest }) => {
        if (response.status !== 401) {
          throw new HttpError("Network Error", response);
        }

        const accessToken = "mock-token";

        const updatedConfig = { ...originalRequest };
        const headers = new Headers(updatedConfig.headers || {});
        headers.set("Authorization", `Bearer ${accessToken}`);
        updatedConfig.headers = headers;

        const url = response.url.replace("https://api.test.com", "");
        const method = originalRequest?.method?.toLowerCase() as
          | "get"
          | "post"
          | "patch"
          | "delete";

        try {
          return await httpClient[method](url, updatedConfig);
        } catch (err) {
          throw err;
        }
      },
    });

    const response = await httpClient.get("/protected", {
      headers: { Authorization: "Bearer invalid-token" },
    });
    expect(response).toStrictEqual({ message: "Protected Resourse" });
  });
});
