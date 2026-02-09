"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User, Zap } from "lucide-react";

export default function UserAuth() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />;
    }

    if (session) {
        return (
            <div className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs font-medium text-white hidden md:block">{session.user?.name}</span>
                {session.user?.image ? (
                    <img
                        src={session.user.image}
                        alt="User"
                        className="w-8 h-8 rounded-full border border-primary/30"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut()}
                    className="w-8 h-8 rounded-full hover:bg-white/10"
                >
                    <LogOut className="w-4 h-4 text-muted-foreground" />
                </Button>
            </div>
        );
    }

    return (
        <div className="flex gap-2">
            <Button
                onClick={() => signIn("credentials", { username: "Demo User", callbackUrl: "/dashboard" })}
                variant="outline"
                size="sm"
                className="rounded-full gap-2 border-white/10 hover:bg-white/5 text-xs"
            >
                <Zap className="w-3 h-3 text-primary" />
                <span className="hidden sm:inline">Demo</span>
            </Button>
            <Button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                variant="ghost"
                size="sm"
                className="rounded-full gap-2 text-primary hover:bg-primary/10"
            >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
            </Button>
        </div>
    );
}
