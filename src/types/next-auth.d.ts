/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

//code is enhancing the types provided by the NextAuth library to include additional properties
declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      role:string
      name:string,
      userId:string
    };
  }
}