const { VSRegister, VSLogin } = require('../libs/validation/auth')
const { generateToken } = require("../utils/token")
const prisma = require('../libs/prisma')
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    VSRegister.parse(req.body)

    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message : "email telah digunakan"
      })
    }

    const hashing  = await bcrypt.hash(password, 10)

    await prisma.users.create({
      data: {
        avatar: "https://res.cloudinary.com/dyominih0/image/upload/v1697817852/default-avatar-icon-of-social-media-user-vector_p8sqa6.jpg",
        username: name,
        email: email,
        password: hashing,
      }
    })

    res.status(200).json({
      message: "Berhasil mendaftar"
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    VSLogin.parse(req.body)

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = await generateToken(user);

    res.status(200).json({
      message: "Berhasil login",
      data: {
        email: user.email,
        role: user.role,
        token: token,
      }
    })

  } catch (error) {
    
  }
}

const me = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: 'Success',
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  me,
}