/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#306BFF",
        grey: "#778599",
        disableBlue: "#83A6FF",
        white: "#FFFFFF",
        textGrey: "#94A3B8",
        textBlack: "#1E293B",
        semiWhite: "#F8FAFC",
        hoverColor: "#EEF2F6",
        Success: "#17945A",
        lightGreen: "#DCF8E7",
        Danger: "#F44336",
        lightRed: "#FFE4E4 ",
        Warning: "#E0A303",
      },
      rotate: {
        45: "45deg",
        90: "90deg",
        135: "135deg",
        180: "180deg",
        270: "270deg",
      },
    },
  },
  plugins: [],
};
