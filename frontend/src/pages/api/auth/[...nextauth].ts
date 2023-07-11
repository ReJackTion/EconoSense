import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import auth from "services/auth.service";
import validator from "validator";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, //in secs (for now is set to 7 days)
  },

  //   Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          let postBody = {};
          if (validator.isEmail(credentials.email)) {
            postBody = {
              email: credentials.email,
              password: credentials.password,
            };
            const res = await auth.login(
              credentials.email,
              credentials.password
            );
            return res;
          }

          // If let's say both email and phone is not a valid one then return null,
          // which means logged in failure.
          return null;
        } catch (err) {
          //   console.error(err)

          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  theme: {
    colorScheme: "light",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      // console.log("jwt user:", user)
      // console.log("jwt token:", token)
      // save the jwt that you get from api
      interface User_New extends User {
        accessToken: string;
        userProfile: any;
      }
      let user_new = user as User_New;
      user && (token.token = user_new?.accessToken);
      user && (token.user = user_new.userProfile);
      // token.token = user.token

      // console.log('token form callbacks:', token)
      return token;
    },
    session: async ({ session, token, user }) => {
      // console.log("session user:", user)
      // console.log("session token:", token)
      // console.log("session session:", session)
      interface Session_New extends Session {
        token: any;
        user: any
      }

      interface Token_New extends JWT {
        user: any 
      }
      
      let session_new = session as Session_New;
      let token_new = token as Token_New;

      session_new.token = token_new.token; // Setting token in session
      session_new.user.name = `${token_new.user.first_name} ${token_new.user.surname}`;
      session_new.user.email = token_new.user.email;
      session_new.user.emailNotification = token_new.user.emailNotification;
      // session.user.image = token.picture
      // session.userProfile = user.user

      return session_new;
    },
  },
  //   pages:{
  //         signIn: '/auth/sign-in'
  //       }

  // providers: [
  //     // OAuth authentication providers...

  //     GoogleProvider({
  //       clientId: process.env.GOOGLE_ID,
  //       clientSecret: process.env.GOOGLE_SECRET
  //     }),

  //   ],

  //   callbacks: {
  //     async signIn({ account, profile }) {
  //       if (account.provider === "google") {
  //         return profile.email_verified && profile.email.endsWith("@example.com")
  //       }
  //       return true // Do different verification for other providers that don't have `email_verified`
  //     },
  //   },
  //   pages:{
  //     signIn: '/auth/sign-in'
  //   }
});
