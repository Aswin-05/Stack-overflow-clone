import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllQuestions } from "./actions/questionAction";
import { fetchAllUsers } from "./actions/userAction";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllQuestions());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const [slideIn, setSlideIn] = useState(true);

    useEffect(() => {
        if (window.innerWidth <= 760) {
            setSlideIn(false);
        }
    }, []);

    const handleSlideIn = () => {
        if (window.innerWidth <= 760) {
            setSlideIn((state) => !state);
        }
    };
    return (
        <Router>
            <Navbar handleSlideIn={handleSlideIn} />
            <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
        </Router>
    );
}

export default App;
