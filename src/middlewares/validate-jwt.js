require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

function validateJWT(req, res, next) {
  console.log(req.headers);
  const token = req.headers.cookie.split('=')[1];
  if (!token) {
    return res.status(401).send('User not authenticated');
  }
  try {
    const data = jwt.verify(token, SECRET_KEY);
    console.log(data);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = validateJWT;
