import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials?.username === "Demo User") {
                    return { id: "1", name: "Demo User", email: "demo@example.com" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session, token }: any) {
            return session;
        },
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
