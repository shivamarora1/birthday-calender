module.exports = {
  presets: [
    'ts-jest',
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
