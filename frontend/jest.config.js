module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/test/mocks/cssMock.js",
    "\\.(png|less)$": "<rootDir>/test/mocks/pngMock.js",
  },
};
