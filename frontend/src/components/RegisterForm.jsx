import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const RegisterForm = ({ switchForm }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { username: username, email: email, password: password };
        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/register`, data)
            .then((result) => {
                console.log(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className="input" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className="input" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="c-password">Confirm Password:</label>
                    <input className="input" type="password" name="c-password" id="c-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <div>
                    <button className="btn btn-primary self-start" type="submit">
                        Register
                    </button>
                </div>
            </form>
            <div>
                <p>Already have an account? Sign in instead:</p>
                <button className="btn btn-primary" onClick={switchForm}>
                    Sign In
                </button>
            </div>
        </div>
    );
};

RegisterForm.propTypes = {
    switchForm: PropTypes.func.isRequired,
};

export default RegisterForm;
