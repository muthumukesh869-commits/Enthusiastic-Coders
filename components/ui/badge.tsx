import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" | "neon" }
>(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-white/20 text-foreground",
        neon: "bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 text-neon-blue",
    }

    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                variants[variant],
                className
            )}
            {...props}
        />
    )
})
Badge.displayName = "Badge"

export { Badge }
