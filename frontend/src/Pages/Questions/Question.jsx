import React, { useState } from "react";
import "./Question.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import copy from "copy-to-clipboard";
import Avatar from "../../Components/Avatar/Avatar";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import DisplayAnswer from "./DisplayAnswer";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, postAnswer, voteQuestion } from "../../actions/questionAction";

const Question = () => {
    const { id } = useParams();
    const [Answer, setAnswer] = useState("");
    const User = useSelector((state) => state.currentUserReducer);
    const questionsList = useSelector((state) => state.questionsReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentURL = window.location.href;

    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            alert("Login or Signup to answer a question");
            navigate("/Auth");
        } else {
            dispatch(
                postAnswer({
                    id,
                    noOfAnswers: answerLength + 1,
                    answerBody: Answer,
                    userAnswered: User.name
                })
            );
            setAnswer("");
        }
    };

    const handleShare = () => {
        copy(currentURL);
    };

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate));
    };

    const handleUpVote = () => {
        if (User === null) {
            navigate("/Auth");
        } else {
            dispatch(voteQuestion(id, "upVote"));
        }
    };

    const handleDownVote = () => {
        if (User === null) {
            navigate("/Auth");
        } else {
            dispatch(voteQuestion(id, "downVote"));
        }
    };

    return (
        <div className="question-details-page">
            {questionsList?.data === null ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {questionsList?.data
                        .filter((question) => question._id === id)
                        .map((question) => (
                            <div key={question._id}>
                                <section className="question-details-container">
                                    <h1>{question.questionTitle}</h1>
                                    <div className="question-details-container-2">
                                        <div className="question-votes" style={{ marginTop: "7px" }}>
                                            <img
                                                src={upvote}
                                                alt=""
                                                width="18"
                                                className="votes-icon"
                                                onClick={handleUpVote}
                                            />
                                            <p>{question.upVote.length - question.downVote.length}</p>
                                            <img
                                                src={downvote}
                                                alt=""
                                                width="18"
                                                className="votes-icon"
                                                onClick={handleDownVote}
                                            />
                                        </div>
                                        <div style={{ width: "100%", marginTop: "10px" }}>
                                            <p className="question-body" style={{ margin: "0" }}>
                                                {question.questionBody}
                                            </p>
                                            <div className="question-details-tags">
                                                {question.questionTags.map((tag) => (
                                                    <p key={tag}>{tag}</p>
                                                ))}
                                            </div>
                                            <div className="question-actions-user">
                                                <div>
                                                    <button type="button" onClick={handleShare}>
                                                        Share
                                                    </button>
                                                    {User?._id === question?.userId && (
                                                        <button type="button" onClick={handleDelete}>
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link
                                                        to={`/Users/${question.userId}`}
                                                        className="user-link"
                                                        style={{ color: "#0086d8" }}
                                                    >
                                                        <Avatar
                                                            backgroundColor="orange"
                                                            px="9px"
                                                            py="5px"
                                                            borderRadius="5px"
                                                        >
                                                            {question.userPosted.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                        <div>{question.userPosted}</div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {question?.answers?.length !== 0 && (
                                    <section>
                                        <h3>{question?.noOfAnswers} Answers</h3>
                                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                    </section>
                                )}
                                <section className="post-ans-container">
                                    <h3>Your Answer</h3>
                                    <form
                                        onSubmit={(e) => {
                                            handlePostAns(e, question?.noOfAnswers);
                                        }}
                                    >
                                        <textarea
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            value={Answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            required
                                        ></textarea>
                                        <br />
                                        <input type="submit" className="post-ans-btn" value="Post Your Answer" />
                                    </form>
                                    <p>
                                        Browse other Question tagged
                                        {question.questionTags.map((tag) => (
                                            <Link to="/Tags" key={tag} className="ans-tags">
                                                {" "}
                                                {tag}{" "}
                                            </Link>
                                        ))}{" "}
                                        or
                                        <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}>
                                            {" "}
                                            ask your own question.
                                        </Link>
                                    </p>
                                </section>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default Question;
