// /** @type {import('tailwindcss').Config} */
import  type { Config } from 'tailwindcss';
const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["Montserrat", "sans-serif"],
			},
		},
	},
	plugins: [],
};

export default config;
