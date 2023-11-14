const { askQuestion, getAllQuestions, deleteQuestion, voteQuestion } = require("../controller/questionCntrl");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/ask-question", authMiddleware, askQuestion);
router.get("/get-all-questions", getAllQuestions);
router.delete("/delete/:id", authMiddleware, deleteQuestion);
router.patch("/vote/:id", authMiddleware, voteQuestion);
module.exports = router;
