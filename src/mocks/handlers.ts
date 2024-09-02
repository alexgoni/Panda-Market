import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/users", () =>
    HttpResponse.json([
      {
        id: 1,
        name: "Ham",
      },
    ]),
  ),
];
