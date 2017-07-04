module.exports = {
  version: 'v1',
  JWT_SECRET: "app-secret",
  JWT_OPTIONS: {
    expiresIn: "180d",
    algorithm: 'HS256',
  },
};
