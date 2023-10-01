import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,js,svelte,html}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "xs": "0.563rem",
        "sm": "0.75rem",
        "md": "1.333rem",
        "lg": "1.777rem",
        "xl": "2.369rem",
        "2xl": "3.157rem",
        "3xl": "4.209rem",
        "4xl": "5.61rem",
        "5xl": "7.478rem",
        "6xl": "9.969rem",
        "7xl": "13.288rem",
        "8xl": "17.713rem",
        "9xl": "23.612rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "dark",
  },
} satisfies Config;
