import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

const SigninForm = ({ switchForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email: email, password: password };

        try {
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data, { withCredentials: true });
            if (result.status === 200) {
                setIsAuthenticated(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true });
                setUser(res.data.user);
                console.log(res.data.user);
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
                    <input className="input" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

SigninForm.propTypes = {
    switchForm: PropTypes.func.isRequired,
};

export default SigninForm;
