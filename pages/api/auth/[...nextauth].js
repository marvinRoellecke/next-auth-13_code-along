import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [];

if (process.env.VERCEL_ENV === "preview") {
  providers.push(
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {label: "Username", type: "text", placeholder: "username"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        if (
          credentials.username === "octopus" &&
          credentials.password === "octopus"
        ) {
          return {
            name: "Octopus Test User",
            email: "test@example.com",
          };
        } else {
          return null;
        }
      },
    })
  );
} else {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
