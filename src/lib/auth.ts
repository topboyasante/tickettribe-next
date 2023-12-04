import axios from "axios";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import toast from "react-hot-toast";

export const authOptions: NextAuthOptions = {
  //Providers: A way of "Accepting" authentication
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      //Defines what should be done with the credentials provided
      async authorize(credentials, req): Promise<any | {}> {
        // Throw an Error when there are no credentials provided
        if (!credentials) {
          throw new Error("No credentials.");
        }

        // Make a POST Request to the backend to log in:
        const { email, password } = credentials;
        // try {
        //   const res = await axios.post(
        //     "https://ticket-tribe.onrender.com/api/v1/auth/login",
        //     { email, password }
        //   );
        //   const user = res.data;
        //   if (user) {
        //     return user;
        //   } else {
        //     return null;
        //   }
        // } catch (error){
        //   throw new Error("Invalid Credentials");
        // }
        const user = await axios
        .post("https://ticket-tribe.onrender.com/api/v1/auth/login", { email, password })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error("Invalid Credentials");
        });

        return {...user}
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  //Set NextAuth Secret Token
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    //Whenever the strategy is set to "jwt", we need to call the jwt() callback:
    async jwt({ token, user }) {
      //the "user" parameter is res.data
      //set the "token.user" parameter to "user"
      if (user) {
        token.user = user;
      }
      return token; //available as a parameter in the session() callback
    },
    async session({ token, session }) {
      //Session Callbacks store the users info in the session object
      //Add Token to the session object
      if (token) {
        session.user = token.user as Session["user"]
      }
      return session;
    },
  },
};
