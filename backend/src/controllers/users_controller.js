const prisma = require('../libs/prisma');
const bcrypt = require("bcrypt");
const cloudinary = require('../libs/cloudinary');
const { Readable } = require('stream');




const saveRecipes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { resepId } = req.body;

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    const resep = await prisma.resep.findUnique({
      where: { 
        id: resepId,
        deletedAt: null,
       },
    });

    if (!user || !resep) {
      return res.status(404).json({ message: 'User atau resep tidak ditemukan' });
    }

    const existingSavedRecipe = await prisma.savedRecipe.findFirst({
      where: {
        userId: user.id,
        resepId: resep.id,
      },
    });

    if (existingSavedRecipe) {
      await prisma.savedRecipe.delete({
        where: { id: existingSavedRecipe.id },
      });

      return res.status(200).json({
        message: 'Resep berhasil dihapus dari daftar disimpan',
        isSaved: false,
      });
    }

    const newSavedRecipe = await prisma.savedRecipe.create({
      data: {
        userId: user.id,
        resepId: resep.id,
      },
    });

    res.status(200).json({
      message: 'Resep berhasil ditambahkan ke daftar disimpan',
      isSaved: true,
      savedRecipeId: newSavedRecipe.id,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSavedResep = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;

    const savedRecipes = await prisma.savedRecipe.findMany({
      where: {
        userId: userId,
      },
      select: {
        resep: {
          select: {
            id: true,
            name: true,
            description: true,
            history: true,
            culture: true,
            ingredients: true,
            alternatifIngredient: true,
            resepImages: {
              where: {
                deletedAt: null,
              },
              select: {
                id: true,
                image_url: true,
              }
            },
            categories: {
              select: {
                id: true,
                name: true,
              }
            },
          },
        },
      },
    });
    if (savedRecipes.length === 0) {
      return res.status(200).json({
        message: `Hai ${username}, kamu belum menyimpan resep nih. Ayo simpan resep terbaik kamu!`,
        data: [],
      });
    }


    res.status(200).json({
      message: `Hai ${username}, berikut list resep yang kamu simpan`,
      data: savedRecipes.map(savedRecipe => savedRecipe.resep),
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { username, email, password } = req.body;

    const existingUser = await prisma.users.findFirst({
      where: {
        email: email,
        id: {
          not: userId,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan oleh pengguna lain' });
    }

    const hashing  = await bcrypt.hash(password, 10)


    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        username: username || undefined,
        email: email || undefined,
        password: hashing || undefined,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    res.status(200).json({
      message: 'Profil pengguna berhasil diperbarui',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatarUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const uploadStream = cloudinary.uploader.upload_stream({
      resource_type: "image",
      folder: 'avatar'
    }, async (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }

      try {
        const updatedAvatar = await prisma.users.update({
          where: {
            id: userId,
          },
          data: {
            avatar: result.secure_url,
          },
        });

        res.status(200).json({
          message: 'Berhasil update avatar',
          data: {
            url: updatedAvatar.avatar,
          }
        })
      } catch (dbError) {
        console.error(dbError);
        return res.status(500).json({
          message: "Internal Server Error",
          error: dbError.message,
        });
      }
    })
    const readableStream = new Readable();
    readableStream._read = () => {};
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    readableStream.pipe(uploadStream);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  saveRecipes,
  getAllSavedResep,
  updateProfile,
  updateAvatarUser
};