import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../utils/connectMongo";
import User from "@/models/userModel";
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { username, password } = credentials;
          await connectMongo();
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(404).json({
              message: "There is no user with this credentialas",
            });
          }
          if (user.password !== password) {
            return res.status(400).json({
              message: "Invalid credentialas",
            });
          }
          return user;
        } catch (err) {}
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user;
      session.user = user;
      return session;
    },
  },
};
export default NextAuth(authOptions);
