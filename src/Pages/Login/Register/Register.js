import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const Register = () => {
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

        createUserWithEmailAndPassword(email, password);
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

                <input type="submit" value="Register" />
            </form>
            <p>
                Already have an account?{" "}
                <Link to="/login" className="text-danger text-decoration-none">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
