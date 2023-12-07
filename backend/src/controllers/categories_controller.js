const prisma = require('../libs/prisma')

const getAllCategories = async (req, res, next) => {
    try {
        const category = await prisma.categories.findMany({
            select: {
                id: true,
                name: true,
            }
        })
        if (!category) {
            res.status(404).json({
                message: 'Tidak ada categori makanan'
            })
        }

        res.status(200).json({
            message: 'Daftar kategori makanan',
            data: category
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCategories,
}