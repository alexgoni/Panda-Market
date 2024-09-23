import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("https://api.test.com/resource", () =>
    HttpResponse.json({ message: "GET successful" }),
  ),
  http.post("https://api.test.com/resource", () =>
    HttpResponse.json({ message: "POST successful" }, { status: 201 }),
  ),
  http.get("https://api.test.com/error", () =>
    HttpResponse.json({ message: "Internal Server Error" }, { status: 404 }),
  ),
  http.get("https://api.test.com/protected", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (authHeader === "Bearer mock-token") {
      return HttpResponse.json({ message: "Protected Resourse" });
    }

    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }),
];
