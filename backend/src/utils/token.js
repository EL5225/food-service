const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
  return token;
}

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
