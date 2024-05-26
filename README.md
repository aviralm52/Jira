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

# RPC & gRPC

- RPC in this project is used for better coupling and typesafe api (due to its inference of type)
- gRPC format is widely adopted due to two reasons, first one is the use of ProtoBuf (protocol buffers data type instead of json which is a strongly typed data type and is much faster than json), and second is the gRPC is built on top of HTTP/2 to provide a high-performance foundation at scale.

# Developer Tools - Performance Tab

##### Interaction to Next Paint (INP) - It measures the time it takes from the user initiating an interaction (like a click or tap) to the next significant screen update that results from that interaction.
##### Cumulative Layout Shift (CLS) - It measures the total amount of unexpected layout shifts that occur while a page is loading. Layout shifts happen when elements on the page move from one position to another
##### Largest Contentful Paint (LCP) - It measures the time it takes for the largest visible content element (such as an image, video, or block of text) to load and become visible within the viewport. Essentially, LCP gauges how long it takes for the main content of a page to load and appear to the user.