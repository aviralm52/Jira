import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie";

import { createAdminClient } from "@/lib/appwrite";
import { loginSchema, registerSchema } from "../Schemas";
import { AUTH_COOKIE } from "../constants";

const route = new Hono()
    .post("/login", zValidator("json", loginSchema), async (c) => {
        const { email, password } = c.req.valid("json");

        return c.json({ email, password });
    })
    .post("/register", zValidator("json", registerSchema), async (c) => {
        const { name, email, password } = c.req.valid("json");
        console.log(name, email, password);

        const { account } = await createAdminClient();
        const user = await account.create(ID.unique(), email, password, name);
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ data: user });
    });

export default route;

// zValidator(data_type, schema_to_validate)
// zValidator is just like a middleware and we can use multiple middlewares, e.g one more zValidator can be used to validate params - 2:15:00
// we can also use c.req.json() instead of c.req.valid("json") but it is not type safe
// if we are not using zValidator then we can also use c.req.valid("json", schema_to_validate)
