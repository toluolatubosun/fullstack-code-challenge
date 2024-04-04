module.exports = {
    mode: "jit",
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Poppins: ["Poppins", "sans-serif"],
                Sora: ["Sora", "sans-serif"]
            },
            colors: {
                primary: "#3266a8"
            }
        }
    },
    plugins: [require("@tailwindcss/forms")]
};
