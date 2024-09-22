import { server } from "mocks/server";

import HTTPClient from ".";

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

  it("time out 테스트", async () => {
    await expect(httpClient.get("/timeout")).rejects.toThrow("Timeout Error");
  });
});
