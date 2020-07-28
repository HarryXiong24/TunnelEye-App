module.exports = {
  plugins: {
    "postcss-import": {},
    "autoprefixer": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-px2rem-exclude": {
      remUnit: 75,
      exclude: /node_modules|folder_name/i
    }
  }
}