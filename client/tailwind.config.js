/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sansSerif: ['lato']
      },
      screens: {
        'xxs': '250px',
        'xs': '350px',
        'xs-m': '400px',
        'sm': '540px',
        'md': '768px',
        'md-x': '900px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        '3xl': '0px 0px 40px 5px rgba(0, 0, 0,0.2)',
      }
    },  
    plugins: [
      require('@tailwindcss/line-clamp'),
      // ...
    ],
  }

}

