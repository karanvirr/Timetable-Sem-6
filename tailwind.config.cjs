module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
  safelist: [
    // row-span classes used
    'row-span-1', 'row-span-2',
    // gradient colors used in schedule
    'from-orange-500','to-red-500','from-orange-400','to-orange-600','from-blue-400','to-blue-600',
    'from-green-400','to-emerald-600','from-green-500','to-teal-500','from-cyan-400','to-cyan-600',
    'from-yellow-300','to-yellow-500','from-orange-400','to-yellow-500','from-purple-400','to-purple-600'
  ]
};
