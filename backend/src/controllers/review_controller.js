const prisma = require('../libs/prisma');


const addRatingAndComment = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const resepId = req.params.resepId;

      const existingResep = await prisma.resep.findUnique({
        where: {
          id: parseInt(resepId),
          deletedAt: null
        },
      });
  
      if (!existingResep) {
        return res.status(404).json({ message: 'Resep tidak ditemukan' });
      }


      const { rating, description } = req.body;
  

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating harus berada dalam rentang 1-5' });
      }
  
      const review = await prisma.review.create({
        data: {
          userId: userId,
          resepId: parseInt(resepId),
          rating: rating,
          description: description,
        },
        select: {
            resepId: true,
            rating: true,
            description: true,
        }
      });
  
      const reviews = await prisma.review.findMany({
        where: {
          resepId: parseInt(resepId),
        },
      });
  
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  
      await prisma.resep.update({
        where: {
          id: parseInt(resepId),
        },
        data: {
          averageRating: averageRating,
        },
      });
  
      res.status(201).json({
        message: 'Rating dan komentar berhasil ditambahkan',
        data: review

      });
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    addRatingAndComment,
  }