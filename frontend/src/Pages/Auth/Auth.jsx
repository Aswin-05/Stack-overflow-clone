import React, { useState } from "react";
import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { Link, useNavigate } from "react-router-dom";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { login, signup } from "../../actions/authActions";
import { useDispatch } from "react-redux";

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup && isChecked) {
           dispatch( signup({name,email,password},navigate))
        } else if (!isSignup) {
            dispatch(login({email,password},navigate))
        }
    };

   
    return (
        <section className="auth-section">
            {isSignup && <AboutAuth />}
            <div className="auth-container">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                required
                            />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
                            <h4>Password</h4>
                            {!isSignup && (
                                <Link
                                    style={{
                                        color: "#007ac6",
                                        fontSize: "13px",
                                        textDecoration: "none",
                                        marginRight: "7px",
                                    }}
                                >
                                    forgot password?
                                </Link>
                            )}
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                        {isSignup && (
                            <p style={{ fontSize: "12px", color: "#636B74" }}>
                                Passwords must contain at least eight characters, <br /> including at least 1 letter and 1
                                number.
                            </p>
                        )}
                    </label>
                    {isSignup && (
                        <label htmlFor="checkbox">
                            <div style={{ display: "flex", gap: "5px" }}>
                                <input
                                    type="checkbox"
                                    name=""
                                    id="checkbox"
                                    style={{ float: "top" }}
                                    onChange={() => {
                                        setChecked(!isChecked);
                                    }}
                                />
                                <p style={{ margin: "0px" }}>
                                    Opt-in to receive occasional product <br /> updates, user research invitations, company{" "}
                                    <br />
                                    announcements, and digests.
                                </p>
                            </div>
                            <BsFillQuestionCircleFill style={{ color: "#636B74" }} />
                        </label>
                    )}
                    <button type="submit" className="auth-btn" style={{ marginTop: "22px" }}>
                        {isSignup ? "Sign up" : "Log in"}
                    </button>
                    {isSignup && (
                        <p style={{ fontSize: "12px", color: "#636B74" }}>
                            By clicking “Sign up”, you agree to our{" "}
                            <span style={{ color: "#1B75D0" }}>terms of service</span> <br /> and acknowledge that you have
                            read and understand <br /> our <span style={{ color: "#1B75D0" }}>privacy policy</span> and{" "}
                            <span style={{ color: "#1B75D0" }}>code of conduct.</span>
                        </p>
                    )}
                </form>
                <p>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button
                        type="button"
                        className="handle-switch-btn"
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setName("");
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        {isSignup ? "Log In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </section>
    );
};

export default Auth;
