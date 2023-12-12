const prisma = require('../libs/prisma');
const { VSResep, VSUpdateResep } = require('../libs/validation/resep');
const cloudinary = require('../libs/cloudinary');
const { Readable } = require('stream');


const createResepImage = async (req, res, next) => {
  try {
    const { resepId } = req.body;

    const uploadStream = cloudinary.uploader.upload_stream({
      resource_type: "image",
      folder: 'resep-images',
      public_id: req.file.originalname
    }, async (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }

      try {
        const imageSize = result.bytes
        const createdResepImage = await prisma.resepImage.create({
          data: {
            image_url: result.secure_url,
            resepId: parseInt(resepId),
            image_name: req.file.originalname,
            image_size: imageSize
          },
        });

        return res.status(201).json({
          message: 'Gambar untuk resep ini telah ditambahkan',
          data: {
            id: createdResepImage.id,
            url: createdResepImage.image_url,
            name: req.file.originalname,
            size: createdResepImage.image_size,
          },
        });
      } catch (dbError) {
        console.error(dbError);
        return res.status(500).json({
          message: "Internal Server Error",
          error: dbError.message,
        });
      }
    });

    const readableStream = new Readable();
    readableStream._read = () => {};
    readableStream.push(req.file?.buffer);
    readableStream.push(null);

    readableStream.pipe(uploadStream);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createResep = async (req, res, next) => {
  try {
    const { name, description, history, culture, ingredients, alternatifIngredient, categories_id } = req.body;
    VSResep.parse(req.body);

    const resep = await prisma.resep.create({
      data: {
        name,
        description,
        history,
        culture,
        ingredients,
        alternatifIngredient,
        categories: {
          connect : {
            id: categories_id,
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        history: true,
        culture: true,
        ingredients: true,
        alternatifIngredient: true,
        categories: true,
      },
    });

    res.status(201).json({
      message: 'Berhasil membuat resep baru',
      resep,
    });
  } catch (error) {
    next(error);
  }
};

const getAllResep = async (req, res, next) => {
  try {
    const { search, page = 1 } = req.query;
    const limit = 8; 

    let whereClause = {
      deletedAt: null,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        name: {
          contains: search,
          mode: 'insensitive',
        },
      };
    }

    const totalCount = await prisma.resep.count({
      where: whereClause,
    });

    if (totalCount === 0) {
      return res.status(404).json({
        message: 'Resep yang kamu cari belum ada',
      });
    }

    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.min(Math.max(1, parseInt(page)), totalPages);

    const offset = (currentPage - 1) * limit;

    const resepList = await prisma.resep.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        averageRating: true,
        culture: true,
        resepImages: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            image_url: true,
          },
        },
      },
    });

    const resepDetailWithCountUserSave = await Promise.all(resepList.map(async (resepMap) => {
      const userCount = await prisma.savedRecipe.count({
        where: {
          resepId: resepMap.id,
        },
      });

      return {
        ...resepMap,
        saved_recipe: userCount,
      };
    }));

    const meta = {
      current_page: currentPage,
      total_resep: totalCount,
      total_page: totalPages,
      next_page: currentPage < totalPages ? currentPage + 1 : null,
      prev_page: currentPage > 1 ? currentPage - 1 : null,
    };

    res.status(200).json({
      message: 'Daftar resep',
      data: resepDetailWithCountUserSave,
      meta: meta,
    });
  } catch (error) {
    next(error);
  }
};


const deleteResep = async (req, res, next) => {
  try {
    const resepId = req.params.id;

    const existingResep = await prisma.resep.findUnique({
      where: {
        id: parseInt(resepId),
      },
    });

    if (!existingResep) {
      return res.status(404).json({
        message: 'Resep tidak ditemukan',
      });
    }

    await prisma.resep.update({
      where: {
        id: parseInt(resepId),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    res.status(200).json({
      message: 'Berhasil menghapus resep.',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const updateResep = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, history, culture, ingredients, alternatifIngredient, categories_id } = req.body;

    VSUpdateResep.parse(req.body);

    const existingResep = await prisma.resep.findUnique({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
    });

    if (!existingResep) {
      return res.status(404).json({
        message: 'resep tidak ditemukan',
      });
    }

    const updateData = {
      name,
      description,
      history,
      culture,
      ingredients,
      alternatifIngredient,
    };

    if (categories_id) {
      updateData.categories = {
        connect: {
          id: categories_id,
        },
      };
    }

    const updatedResep = await prisma.resep.update({
      where: {
        id: parseInt(id),
      },
      data: updateData,
    });

    res.status(200).json({
      message: 'Resep updated successfully',
      data: {
        id: updatedResep.id,
        name: updatedResep.name,
        description: updatedResep.description,
        history: updatedResep.history,
        culture: updatedResep.culture,
        ingredients: updatedResep.ingredients,
        alternatifIngredient: updatedResep.alternatifIngredient,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const deleteResepImage = async (req, res, next) => {
  try {
    const { resepId, imageId } = req.params;

    const existingResepImage = await prisma.resepImage.findUnique({
      where: {
        id: parseInt(imageId),
      },
    });

    if (!existingResepImage || existingResepImage.resepId !== parseInt(resepId)) {
      return res.status(404).json({
        message: 'gambar pada resep ini tidak ditemukan',
      });
    }

    await prisma.resepImage.update({
      where: {
        id: parseInt(imageId),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    res.status(200).json({
      message: 'gambar pada resep ini berhasil dihapus',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getResepById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resepById = await prisma.resep.findMany({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        history: true,
        culture: true,
        ingredients: true,
        alternatifIngredient: true,
        averageRating: true,
        savedRecipes : {
          select: {
            resepId: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              }
            }
          }
        },
        resepImages: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            image_url: true,
            image_name: true,
            image_size: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
            rating: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });

    if (!resepById || resepById.length === 0) {
      return res.status(404).json({
        message: 'Resep not found',
      });
    }

    const resepListWithCount = await Promise.all(resepById.map(async (resepMap) => {
      const userCount = await prisma.savedRecipe.count({
        where: {
          resepId: resepMap.id,
        },
      });

      const ratingCount = {
        current_rating_five: 0,
        current_rating_four: 0,
        current_rating_three: 0,
        current_rating_two: 0,
        current_rating_one: 0,
      };

      resepMap.reviews.forEach((review) => {
        switch (review.rating) {
          case 5:
            ratingCount.current_rating_five++;
            break;
          case 4:
            ratingCount.current_rating_four++;
            break;
          case 3:
            ratingCount.current_rating_three++;
            break;
          case 2:
            ratingCount.current_rating_two++;
            break;
          case 1:
            ratingCount.current_rating_one++;
            break;
          default:
            break;
        }
      });

      const reviewsWithFormattedDate = resepMap.reviews.map((review) => ({
        ...review,
        createdAt: review.createdAt ? formatDate(review.createdAt) : null,
      }));
      return {
        ...resepMap,
        saved_recipe: userCount,
        ...ratingCount,
        reviews: reviewsWithFormattedDate,
      };
    }));
    

    res.status(200).json({
      message: 'Detail resep',
      data: resepListWithCount,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  const reversedDate = formattedDate.replace(/\//g, '-');

  const [month, day, year] = reversedDate.split('-');

  return `${year}-${month}-${day}`;
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createResep,
  createResepImage,
  getAllResep, 
  deleteResep,
  updateResep,
  deleteResepImage,
  getResepById,
  deleteUser
};
