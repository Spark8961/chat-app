import { useState } from "react";
import axios from "axios";
import { FormProps } from "./types";

const RegisterForm: React.FC<FormProps> = ({ switchForm }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirm?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!username) newErrors.username = "Username is required";
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (confirm !== password) newErrors.confirm = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        const data = { username, email, password };
        try {
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className="input" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className="input" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="c-password">Confirm Password:</label>
                    <input className="input" type="password" name="c-password" id="c-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}
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

export default RegisterForm;
