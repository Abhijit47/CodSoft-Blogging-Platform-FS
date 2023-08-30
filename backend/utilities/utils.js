const jwt = require('jsonwebtoken');

const successResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message: message, data: data });
};

const errorResponse = (res, statusCode, message, error) => {
  res.status(statusCode).json({ message: message, error: error });
};

const createToken = (payload, secretKey) => {
  return jwt.sign(payload, secretKey);
};

module.exports = { successResponse, errorResponse, createToken };