const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth_controllers");
const AdminController = require("../controllers/admin_ccontroller");
const CategoryController = require("../controllers/categories_controller")
const UserController = require("../controllers/users_controller")
const ReveiwController = require("../controllers/review_controller")
const { adminMiddleware, authMiddleware} = require("../middlewares/index")
const { imageUpload } = require('../libs/multer');


router.get("/", (req, res) => {
  res.json({ message: "Hello World from API" });
});

//Auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me)

//Resep
router.post('/resep', authMiddleware, adminMiddleware, AdminController.createResep);
router.get('/resep', AdminController.getAllResep);
router.get('/resep/:id',AdminController.getResepById);
router.post('/resep-image',authMiddleware, adminMiddleware, imageUpload.single('image_url'), AdminController.createResepImage);
router.put('/resep/:id', authMiddleware, adminMiddleware, AdminController.updateResep);
router.delete('/resep/:id', authMiddleware, adminMiddleware, AdminController.deleteResep)
router.delete('/resep/:resepId/image/:imageId', authMiddleware, adminMiddleware, AdminController.deleteResepImage)

//Category

router.get('/category', CategoryController.getAllCategories)

//User
router.post('/user/save/resep', authMiddleware, UserController.saveRecipes)
router.get('/user/resep', authMiddleware, UserController.getAllSavedResep)
router.patch('/user', authMiddleware, UserController.updateProfile)
router.put('/user/avatar', authMiddleware, imageUpload.single('image_url'), UserController.updateAvatarUser)

//rating
router.post('/user/rating/:resepId', authMiddleware, ReveiwController.addRatingAndComment)

module.exports = router;