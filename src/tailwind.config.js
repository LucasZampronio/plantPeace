// tailwind.config.js
module.exports = {
    content: [
      './index.html', 
      './src/**/*.{js,ts,jsx,tsx}', 
    ],
    theme: {
      extend: {
        inter: ['Inter', 'sans-serif'],
        colors: {
          grape:'#f1f5f9',
        }
      },
    }, 
    plugins: [],
  };

  