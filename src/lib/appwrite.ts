// src/lib/server/appwrite.js
import "server-only";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

// export async function createSessionClient() {
//   const client = new Client()
//     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

//   const session = cookies().get("my-custom-session");
//   if (!session || !session.value) {
//     throw new Error("No session");
//   }

//   client.setSession(session.value);

//   return {
//     get account() {
//       return new Account(client);
//     },
//   };
// }
// it does not require key which means its pretty harmless so it is used when user needs to create something


export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}
// it is used when we a admin needs to create something such as a new user
