import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    const handleRegister = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;

        if (agree) {
            createUserWithEmailAndPassword(email, password);
        }
        // createUserWithEmailAndPassword(email, password);
    };
    return (
        <div className="w-50 mx-auto mt-2 register-form">
            <h2 className="text-center text-primary">Please Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    required
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                />

                <input
                    onClick={() => setAgree(!agree)}
                    type="checkbox"
                    name="terms"
                    id="terms"
                />
                {/* <label className={agree ? "ps-2" : "ps-2 text-danger"} htmlFor="terms">
                    Accept Genius Car Terms and Conditions
                </label> */}
                <label
                    className={`ps-2 ${agree ? "" : "text-danger"}`}
                    htmlFor="terms"
                >
                    Accept Genius Car Terms and Conditions
                </label>

                <input
                    disabled={!agree}
                    className="w-50 mx-auto btn btn-primary mt-2"
                    type="submit"
                    value="Register"
                />
            </form>
            <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none">
                    Login
                </Link>
            </p>
            <SocialLogin />
        </div>
    );
};

export default Register;
