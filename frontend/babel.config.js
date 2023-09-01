const test = process.env.NODE_ENV === "test";

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [...(test ? ["babel-plugin-transform-vite-meta-env"] : [])],
};
