import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        gray: {
            50: "rgba(255, 0, 0, 0.5)",
            100: "#EEEEEF",
            200: "#E6E9ED",
            600: "#95989C"
        },
        purple: {
            300: "#e0e7fe",
            500: "#3e38a7",
            600: "#5046e4",
      },
    },
  },
},
  plugins: [],
};

export default config;
