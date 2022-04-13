import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
    useSendPasswordResetEmail,
    useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    let errorElement;

    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user]);

    if (error) {
        errorElement = <p className="text-danger">Error: {error?.message}</p>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password);
    };

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast("Sent email");
        } else {
            toast("Please enter your email address");
        }
    };

    return (
        <div className="contsiner w-50 mx-auto mt-2">
            <h2 className="text-primary text-center">Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        ref={emailRef}
                        type="email"
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <Button
                    variant="primary w-50 mx-auto d-block mb-2"
                    type="submit"
                >
                    Login
                </Button>
            </Form>
            {errorElement}
            <p>
                New to Genius Car?{" "}
                <Link
                    to="/register"
                    className="text-primary text-decoration-none"
                >
                    Please Register
                </Link>
            </p>
            <p>
                Forget Password?{" "}
                <button
                    onClick={resetPassword}
                    className="text-primary border-0 bg-white"
                >
                    Reset Password
                </button>
            </p>
            <SocialLogin />
            <ToastContainer />
        </div>
    );
};

export default Login;
