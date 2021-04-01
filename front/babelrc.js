module.exports = {
  presets: [
    ["@babel/preset-react", {
      development: process.env.BABEL_ENV === "development",
    }],
    ["es2015", {"modules":false}]
  ],
  "plugins": [[
    "add-module-exports",
    {
      "addDefaultProperty": true
    }],
    ["transform-runtime", {"polyfill": false}]
  ],
}
