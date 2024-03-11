import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import axios from "axios";
import { setCookie } from "@/app/utils/Cookie";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
	session: {
		strategy: "jwt",
	},
  callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
			}
			return session;
		},
    async signIn({ user, account }) {
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      const email = user?.email;
      try {
        const response = await axios.post(
          `${apiUrl}/auth/${provider}/callback`,
          {
            provider,
            uid,
            name,
            email,
          }
        );
        if (response.status === 200) {
					const data = await response.data
					setCookie("user_id", data.user.token);
					return true
        } else {
          return false;
        }
      } catch (error) {
        console.log("エラー", error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };