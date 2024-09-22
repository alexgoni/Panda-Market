import { HttpResponse, delay, http } from "msw";

export const handlers = [
  http.get("https://api.test.com/resource", () =>
    HttpResponse.json({ message: "GET successful" }),
  ),
  http.post("https://api.test.com/resource", () =>
    HttpResponse.json({ message: "POST successful" }, { status: 201 }),
  ),
  http.get("https://api.test.com/error", () =>
    HttpResponse.json({ message: "Internal Server Error" }, { status: 500 }),
  ),
  http.get("https://api.test.com/timeout", async () => {
    await delay(4000);
    return HttpResponse.json({ message: "GET successful" });
  }),
];
