export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#833471',
        secondary: '#D0021B',
        background: '#F5F5F5',
        text: '#333333',
        previewtext: '#ffeaa7',
        editorBg: '#FFFFFF',
        editorBorder: '#E0E0E0',
        buttonHover: '#3B82F6',
        darkBackground: '#3d3d3d',
        darkText: '#E5E5E5',
        darkEditorBg: '#2D2D2D',
        darkEditorBorder: '#3C3C3C',
      },
    },
  },
  plugins: [
  ],
}
