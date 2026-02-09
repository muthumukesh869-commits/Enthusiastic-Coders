import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Check if we are using placeholder values
const isGoogleConfigured =
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_ID !== "your_id_here" &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_SECRET !== "your_secret_here";

export const authOptions: NextAuthOptions = {
    providers: [
        // Only enabled if configured
        ...(isGoogleConfigured ? [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            })
        ] : []),

        CredentialsProvider({
            id: "credentials",
            name: "Development Account",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "demo_user" },
            },
            async authorize(credentials) {
                // Mock user for development
                return {
                    id: "demo-user-1",
                    name: credentials?.username || "Developer User",
                    email: "dev@example.com",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky",
                };
            },
        }),
    ],
    pages: {
        signIn: "/",
        error: "/", // Redirect to home on error
    },
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.id = (token.sub || token.id) as string;
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        // Auto-signin in dev if Google is not configured? No, keep it explicit.
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev",
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
