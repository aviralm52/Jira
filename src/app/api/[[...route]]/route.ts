import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";

const app = new Hono().basePath("/api");

// app.get("/hello", (c) => {
//   return c.json({ message: "Hello World!" });
// });

// app.get("/temp/:tempId", (c) => {
//   const { tempId } = c.req.param();
//   return c.json({ tempId });
// });

const routes = app
  .route("/auth", auth);

export const GET = handle(app);


export type AppType = typeof routes;