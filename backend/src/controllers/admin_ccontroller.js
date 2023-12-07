const prisma = require('../libs/prisma');
const { VSResep } = require('../libs/validation/resep');
const util = require('util');
const cloudinary = require('../libs/cloudinary');
const { Readable } = require('stream');

const createResepImage = async (req, res, next) => {
  try {
    const { resepId } = req.body;

    const uploadStream = cloudinary.uploader.upload_stream({
      resource_type: "image",
      folder: 'resep-images',
    }, async (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }

      try {
        const createdResepImage = await prisma.resepImage.create({
          data: {
            image_url: result.secure_url,
            resepId: parseInt(resepId),
          },
        });

        res.status(201).json({
          message: 'Resep image created successfully',
          data: {
            id: createdResepImage.id,
            url: createdResepImage.image_url
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
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    readableStream.pipe(uploadStream);
  } catch (error) {
    console.error(error);
    next(error);
  }
};



const createResep = async (req, res, next) => {
  try {
    const { name, description, history, culture, ingredients, alternatifIngredient } = req.body;
    VSResep.parse(req.body);

    const resep = await prisma.resep.create({
      data: {
        name,
        description,
        history,
        culture,
        ingredients,
        alternatifIngredient,
      },
      select : {
        id: true,
        name: true,
        description: true,
        history: true,
        culture: true,
        ingredients: true,
        alternatifIngredient: true,
      }
    });

    res.status(201).json({
      message: 'Resep created successfully',
      resep,
    });
  } catch (error) {
    next(error);
  }
};

const getAllResep = async (req, res, next) => {
    try {
      const resepList = await prisma.resep.findMany({
        where: {
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
          resepImages: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
              image_url: true,
            }
          }
        },
      });
  
      res.status(200).json({
        message: 'List of all resep',
        data: resepList,
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteResep = async (req, res, next) => {
    try {
      const resepId = req.params.id;
  
      const deletedResep = await prisma.resep.update({
        where: {
          id: parseInt(resepId),
        },
        data: {
          deletedAt: new Date(),
        },
      });
  
      if (!deletedResep) {
        return res.status(404).json({
          message: 'Resep not found.',
        });
      }
  
      res.status(200).json({
        message: 'Resep deleted successfully.',
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };


const updateResep = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, history, culture, ingredients, alternatifIngredient } = req.body;

    VSResep.parse(req.body);

    const existingResep = await prisma.resep.findUnique({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
    });

    if (!existingResep) {
      return res.status(404).json({
        message: 'Resep not found',
      });
    }

    const updatedResep = await prisma.resep.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        history,
        culture,
        ingredients,
        alternatifIngredient,
      },
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
      }
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
        message: 'Resep image not found',
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
      message: 'Resep image deleted successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getResepById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resep = await prisma.resep.findUnique({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      include: {
        resepImages: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    if (!resep) {
      return res.status(404).json({
        message: 'Resep not found',
      });
    }

    res.status(200).json({
      data: resep,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createResep,
  getAllResep,
  createResepImage,
  deleteResep,
  updateResep,
  deleteResepImage,
  getResepById
};
