module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'jsdom',
  };
  