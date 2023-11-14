const { postAnswer, deleteAnswer } = require("../controller/answerCntrl");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.patch("/post/:id", authMiddleware, postAnswer);
router.patch("/delete/:id", authMiddleware, deleteAnswer);

module.exports = router;
