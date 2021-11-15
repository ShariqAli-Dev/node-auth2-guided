const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(req.headers);
  if (!token) {
    res.status(401).json('You need a token broskie');
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        next({ status: 401, message: `Token is bad: ${err.message}` });
      } else {
        req.decodedToken = decoded;
      }
    });
  }

  next();
};
