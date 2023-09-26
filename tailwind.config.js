const { colors } = require('@mui/material')

/** @type {import('tailwindcss').Config} */
module.exports = {
    important:true,
 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    screens:{
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
        'mobile':'480px',
        'md':'768px',
        'tablet_md':{'min':'480px','max':'768px'},
        'md_laptop':{'min':'768px','max':'1024px'},
        'tablet_laptop':{'min':'480px','max':'1024px'},
        'mobile_tablet':{'min':'480px','max':'640px'},
        'above_laptop':{'min':'1024px'}
    },

  
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
