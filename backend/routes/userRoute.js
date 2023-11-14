const { signup, login } = require("../controller/authCntrl");
const { getAllUsers, updateUserProfile } = require("../controller/userCntrl");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/all-users", getAllUsers);
router.patch("/update/:id", authMiddleware, updateUserProfile);

module.exports = router;
