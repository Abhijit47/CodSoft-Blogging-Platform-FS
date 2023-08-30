const jwt = require('jsonwebtoken');
const { errorResponse } = require("../utilities/utils");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      return errorResponse(res, 401, "Unauthorized User");
    }

    // verify token
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    // console.log('decodeToken', decodeToken);
    // console.log(!decodeToken);
    if (!decodeToken) {
      return errorResponse(res, 401, "Token malformed");
    }

    // send back to authorized user
    req.user = decodeToken;

  } catch (error) {
    return errorResponse(res, 401, "Authorization error.", error.message);
  }
  next();
};

module.exports = verifyUser;