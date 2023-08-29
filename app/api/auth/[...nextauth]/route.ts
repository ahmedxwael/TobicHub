import { User } from "@/models/User";
import { connectToDB } from "@/utils/db";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	callbacks: {
		session: ({ session, token }: any) => {
			session.accessToken = token.accessToken;
			session.user.id = token.id;

			return session;
		},
		async signIn({ user }: any) {
			try {
				await connectToDB();

				const oldUser = await User.findOne({ email: user.email });

				if (!oldUser) {
					await User.create({
						email: user.email,
						name: user.name,
						image: user.image,
					});
				}

				return user;
			} catch (error) {
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
