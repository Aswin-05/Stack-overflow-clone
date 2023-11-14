require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/userRoute");
const QuestionRouter = require("./routes/questionRoute");
const answerRouter = require("./routes/answerRoute");

const app = express();

// DB Connection
dbConnect();

// Middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// API routes
app.use("/api/user", userRouter);
app.use("/api/questions", QuestionRouter);
app.use("/api/answer", answerRouter);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
