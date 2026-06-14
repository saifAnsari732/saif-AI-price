import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./mongoose";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email Auth",
      credentials: {
        action: { label: "Action", type: "text" }, // "login" or "signup"
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email: credentials.email });

        if (credentials.action === "signup") {
          if (existingUser) {
            throw new Error("User already exists. Please log in.");
          }
          if (!credentials.name) {
            throw new Error("Name is required for sign up.");
          }
          
          const newUser = await User.create({
            email: credentials.email,
            name: credentials.name,
          });

          return { id: newUser._id.toString(), email: newUser.email, name: newUser.name };
        } 
        
        if (credentials.action === "login") {
          if (!existingUser) {
            throw new Error("User not found. Please sign up.");
          }
          return { id: existingUser._id.toString(), email: existingUser.email, name: existingUser.name };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login', // We will create this custom page
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  }
};
