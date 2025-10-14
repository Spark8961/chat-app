import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FormProps } from "./types.js";

const SigninForm = ({ switchForm }: FormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const { setIsAuthenticated, setUser } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        const data = { email, password };

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
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
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
