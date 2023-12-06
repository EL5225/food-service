const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth_controllers");
const authMiddleware = require("../middlewares/index")

router.get("/", (req, res) => {
  res.json({ message: "Hello World from API" });
});
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me)


module.exports = router;