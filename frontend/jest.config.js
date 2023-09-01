module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/test/mocks/cssMock.js",
    "\\.(png|less)$": "<rootDir>/test/mocks/pngMock.js",
  },
  // transform: {
  //   "^.+\\.jsx?$": "babel-jest", // Utilise Babel pour transformer les fichiers JS/JSX
  // },
};
