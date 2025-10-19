import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FormProps } from "./types.js";
import { KeyRound, Mail, UserRound } from "lucide-react";

const SigninForm = ({ switchForm }: FormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        } catch (err) {
            console.log(err);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <div className="container">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        <UserRound />
                        Login
                    </legend>
                    <label htmlFor="email" className="floating-label">
                        <span>Email</span>
                        <label htmlFor="email" className="input focus:outline-none">
                            <span className="label">
                                <Mail />
                            </span>
                            <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </label>
                    <label htmlFor="password" className="input">
                        <span className="label">
                            <KeyRound />
                        </span>
                        <input className="input" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button className="btn btn-neutral self-start" type="submit">
                        Sign In
                    </button>
                    <p>Don't have an account?:</p>
                    <button className="btn btn-neutral" onClick={switchForm}>
                        Register
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default SigninForm;
