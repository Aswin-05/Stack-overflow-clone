import React from "react";
import "./HomeMainbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
// import { questionsList } from "../../data";
import { useSelector } from 'react-redux';

const HomeMainbar = () => {
    const location = useLocation();
    const User = useSelector(state=>state.currentUserReducer);
    const navigate = useNavigate();

    const questionsList = useSelector(state=>state.questionsReducer)
    // console.log(typeof(questionsList));

    const checkAuth = () => {
        if (User) {
            navigate("/askquestion");
        } else {
            alert("login or signup to ask a question");
            navigate("/auth");
        }
    };

    return (
        <div className="main-bar">
            <div className="main-bar-header">
                {location.pathname === "/" ? <h1>Top Questions</h1> : <h1>All Questions</h1>}
                <button onClick={checkAuth} className="ask-btn">
                    Ask Question
                </button>
            </div>
            <div>
                {questionsList === null ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <p>{questionsList.data.length} questions</p>
                        <QuestionList questionsList={questionsList.data} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeMainbar;
