import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { async } from "@firebase/util";
import useToken from "../../../hooks/useToken";

const Register = () => {
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth, {
            sendEmailVerification: true,
        });

    const [updateProfile, updating, updateProfileError] =
        useUpdateProfile(auth);

    const [token] = useToken(user);

    let errorElement;
    if (error) {
        errorElement = <p className="text-danger">Error: {error?.message}</p>;
    }

    useEffect(() => {
        if (token) {
            // console.log(user);
            navigate("/home");
        }
    }, [token]);

    const handleRegister = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
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
            {errorElement}
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
