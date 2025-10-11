import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FormProps } from "./types.js";

const SigninForm = ({ switchForm }: FormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setIsAuthenticated, setUser } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = { email: email, password: password };

        try {
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data, { withCredentials: true });
            if (result.status === 200) {
                setIsAuthenticated(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true });
                setUser(res.data.user);
                navigate("/chats");
            }
            if (result.status === 401) {
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.log(err);
            if (axios.isAxiosError(err)) {
                setError(true);
                setErrorMessage(err.response?.data?.error);
            }
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <div className="container">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className="input" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error ? <p>{errorMessage}</p> : null}
                <div>
                    <button className="btn btn-primary self-start" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
            <div>
                <p>Don't have an account?:</p>
                <button className="btn btn-primary" onClick={switchForm}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default SigninForm;
