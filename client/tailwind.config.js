/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [],
    theme: {
        extend: {
            keyframes: {
                typing: {
                    "0%": { "clip-path": "inset(0 100% 0 0)" },
                    "100%": { "clip-path": "inset(0 0 0 0)" },
                },
                blink: {
                    "50%": { borderColor: "transparent" },
                },
            },
            animation: {
                typing: "typing 2s steps(30, end) forwards, blink 0.75s step-end infinite",
            },
        },
    },
};
