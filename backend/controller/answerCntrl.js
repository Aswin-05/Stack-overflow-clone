const mongoose = require("mongoose");
const Questions = require("../model/questionModel");

const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered} = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(
            _id,
            {
                $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
            },
            { new: true }
        );
        res.status(200).json(updatedQuestion);
    } catch (err) {
        res.status(400).json("error in updating");
    }
};

const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...");
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        await Questions.findByIdAndUpdate(
            _id,
            {
                $pull: { answer: { _id: answerId } },
            },
            { new: true }
        );
        res.status(200).json({messade:"answer deleted"})
    } catch (err) {
        res.status(405).json(err);
    }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, {
            $set: { noOfAnswers: noOfAnswers },
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    postAnswer,
    deleteAnswer,
};
