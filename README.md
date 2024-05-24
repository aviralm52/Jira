#### Tech Stack used

# Hono js

- Used to create APIs, it is used due to its fast and ultra-lightweight nature and also the optimization for serverless environments such as vercel and cludeflare.
- It supports global middleware, and also id does not require to wrap the middleware on the route just like nextjs.
- Unlike Nextjs we can write our Api routes outside of API folder in hono.

# Tanstack Query

- Used tanstack query with Hono js for end to end tyepsafety such as if you are writing axios.post('/foo/${abc}'), then it will highlight whether the route 'foo' exists or not.


# Appwrite
- Used appwrite for creating user and storing other data.
- Used server-only package to keep the keys and other tokens safe, you just have to write "import server-only" on the top of the page and it will convert that page to server side page.

# server-only (npm package)
- It is used to convert the page to server side page, inspite of default server page behaviour of next js, it is used because if you write "import server-only" on top of a page then it will create it as a server page, and it will also give error if you import it in a client side page.
