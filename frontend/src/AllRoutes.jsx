import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Questions from "./Pages/Questions/Questions";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/User/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";

const AllRoutes = ({ slideIn, handleSlideIn }) => {
    return (
        <Routes>
            <Route excat path="/" element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/AskQuestion" element={<AskQuestion />} />
            <Route path="/questions" element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path="/questions/:id" element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path="/tags" element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path="/users" element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path="/users/:id" element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
        </Routes>
    );
};

export default AllRoutes;
