const config = {};

config.jwt = {
  secret: process.env.JWT_SECRET_KEY,
  expireIn: process.env.JWT_EXPIRE_IN || '300',
  algorithm: process.env.JWT_ALGORITHM || 'HS256',
};

module.exports = config;
