const { VSRegister, VSLogin } = require('../libs/validation/auth')
const { generateToken } = require("../utils/token")
const prisma = require('../libs/prisma')
const bcrypt = require("bcrypt");
const { generateOTP, generateExpirationTime, sendOTPEmail } = require("../utils/email")

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

    const otpCode = generateOTP();

    const hashing  = await bcrypt.hash(password, 10)

    const newUser = await prisma.users.create({
      data: {
        avatar: "https://res.cloudinary.com/dyominih0/image/upload/v1697817852/default-avatar-icon-of-social-media-user-vector_p8sqa6.jpg",
        username: name,
        email: email,
        password: hashing,
      }
    })

    const expirationTime = generateExpirationTime();

    await prisma.oTP.create({
      data: {
        code: otpCode,
        expiration: expirationTime,
        userId: newUser.id,
      },
    })

    await sendOTPEmail(email, otpCode);

    res.status(200).json({
      message: "Berhasil mendaftar, silahkan cek email anda untuk verifikasi"
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

    if (!user.isVerified) {
      return res.status(403).json({
        message: 'Akun Anda belum diverifikasi',
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

const verifyEmail = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const otp = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        code: otpCode,
        expiration: {
          gte: Math.floor(Date.now() / 1000),
        },
      },
    });

    if (!otp) {
      return res.status(401).json({
        success: false,
        message: 'Invalid OTP atau OTP sudah expired',
      });
    }

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    await prisma.oTP.delete({
      where: {
        id: otp.id,
      },
    });

    res.status(200).json({
      message: 'Email berhasil diverifikasi, silahkan login',
    });

  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    await prisma.oTP.deleteMany({
      where: {
        userId: user.id,
        expiration: {
          lt: Math.floor(Date.now() / 1000),
        },
      },
    });

    const otpCode = generateOTP();
    const expirationTime = generateExpirationTime();

    await prisma.oTP.create({
      data: {
        code: otpCode,
        expiration: expirationTime,
        userId: user.id,
      },
    });

    await sendOTPEmail(email, otpCode);

    res.status(200).json({
      message: 'Berhasil kirim ulang kode OTP',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyEmail,
  resendOtp,
  login,
  me,
}