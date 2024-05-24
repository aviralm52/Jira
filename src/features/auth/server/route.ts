import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../Schemas";

const app = new Hono().post("/login", zValidator("json", loginSchema), (c) => {
  return c.json({ success: "OK" });
});

export default app;

// zValidator(data_type, schema_to_validate)
