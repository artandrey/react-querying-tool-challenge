/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            animation: {
                wiggle: 'wiggle 0.3s ease-in-out',
            },
            backgroundImage: {
                wood: "url('https://images.pexels.com/photos/172276/pexels-photo-172276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            },
        },
    },
    plugins: [],
};
