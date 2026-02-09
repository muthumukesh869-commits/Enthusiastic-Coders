import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                neon: {
                    blue: "#00d4ff",
                    purple: "#a855f7",
                    pink: "#ec4899",
                    green: "#10b981",
                },
            },
        },
    },
    plugins: [],
};

export default config;
