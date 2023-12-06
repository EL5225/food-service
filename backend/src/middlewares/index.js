const jwt = require('jsonwebtoken');
const prisma = require('../libs/prisma');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized: Missing token',
      });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await prisma.users.findUnique({
      where: {
        id: decodedToken.userId,
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid token',
    });
  }
};

module.exports = authMiddleware;
