import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                "2xl": "1400px",
                "3xl": "1600px",
                "4xl": "1920px",
            },
        },
        extend: {
            backgroundImage: {
                main: "url('/main_bg.avif')",
                main_mobile: "url('/main_bg_mobile.avif')",
                zeekr: "url('/zeekr_bg.avif')",
                zeekr_mobile: "url('/zeekr_bg_mobile.avif')",
                rectangle_main: "url('/rectangle.svg')",
                main_stage_bg: "url('/main_stage_bg.webp')",
                rectangle_main_mobile: "url('/rectangle_mobile.svg')",
                rectangle_main_stage: "url('/rectangle_stage.svg')",
                rectangle_main_stage_mobile:
                    "url('/rectangle_stage_mobile.svg')",
                bg_new_card: "url('/bg_new.png')",
                zeekr_constructor: "url('/zeekr/constructor/bg.avif')",
            },
            fontFamily: {
                electrohub: ["Electrohub", "sans-serif"],
                terminatorgen: ["TerminatorGen", "sans-serif"],
                electrohubHeading: ["ElectrohubHeading", "sans-serif"],
                montserrat: ["Montserrat", "sans-serif"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            boxShadow: {
                brandCard: "5px 5px 10px 0 rgba(0, 0, 0, 0.15)",
                brandCardHover: "0 0 20px 2px rgba(0, 0, 0, 0.1)",
                mobileBrandCard: "0 4px 20px 2px rgba(0, 0, 0, 0.06)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
} satisfies Config;

export default config;
