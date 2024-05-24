#### Tech Stack used

# Hono js

- Used to create APIs, it is used due to its fast and ultra-lightweight nature and also the optimization for serverless environments such as vercel and cludeflare.
- It supports global middleware, and also id does not require to wrap the middleware on the route just like nextjs.
- Unlike Nextjs we can write our Api routes outside of API folder in hono.

# Tanstack Query

- Used tanstack query with Hono js for end to end tyepsafety such as if you are writing axios.post('/foo/${abc}'), then it will highlight whether the route 'foo' exists or not.
