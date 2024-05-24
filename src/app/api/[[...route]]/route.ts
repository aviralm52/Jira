import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ message: "Hello World!" });
});

app.get("/temp/:tempId", (c) => {
  const { tempId } = c.req.param();
  return c.json({ tempId });
});

export const GET = handle(app);
