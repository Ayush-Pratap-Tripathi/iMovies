const router = require("express").Router();

const {
  register,
  login,
  editProfile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/editprofile", editProfile);
module.exports = router;
