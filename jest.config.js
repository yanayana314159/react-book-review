const config = {
  roots: ["<rootDir>/src"],

  moduleNameMapper: {
    "^axios$": "<rootDir>/mocks/axios.js",
  },
};

export default config;
