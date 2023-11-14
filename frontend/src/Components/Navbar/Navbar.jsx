import React, { useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
import { setCurrentUser } from "../../actions/currentUser";
import { logout } from "../../actions/authActions";
import bars from "../../assets/bars-solid.svg";

const Navbar = ({ handleSlideIn }) => {
    const User = useSelector((state) => state.currentUserReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = User?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }

        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }, [User?.token, dispatch]);

    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    return (
        <nav className="main-nav">
            <div className="navbar">
                <button className="slide-in-icon" onClick={() => handleSlideIn()}>
                    <img src={bars} alt="bars" width="15" />
                </button>
                <div className="navbar-1">
                    <Link to="/" className="nav-item nav-logo">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Link className="nav-item nav-btn res-nav">About</Link>
                    <Link className="nav-item nav-btn res-nav">Products</Link>
                    <Link className="nav-item nav-btn res-nav">For Teams</Link>
                    <form>
                        <input type="text" placeholder="Search..." />
                        <img src={search} alt="search" width="18" className="search-icon" />
                    </form>
                </div>
                <div className="navbar-2">
                    {!User ? (
                        <Link to="/auth" className="nav-item nav-links">
                            Log in
                        </Link>
                    ) : (
                        <>
                            <Link
                                to={`/users/${User?._id}`}
                                style={{ color: "white", textDecoration: "none", marginRight: "5px" }}
                            >
                                <Avatar backgroundColor="#009dff" px="10px" py="5px" borderRadius="50%" color="white">
                                    {User?.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </Link>
                            <button className="nav-item nav-links" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
