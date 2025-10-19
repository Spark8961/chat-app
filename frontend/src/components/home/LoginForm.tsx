import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { FormProps } from "./types.js";
import { KeyRound, Mail, UserRound } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const login = async ({ email, password }: { email: string; password: string }) => {
    const data = { email: email, password: password };
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data, { withCredentials: true });
};

const auth = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true });
    console.log(res.data);
    return res;
};

const SigninForm = ({ switchForm }: FormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useQuery({
        queryKey: ["user"],
        queryFn: auth,
        enabled: false,
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["user"] });
            navigate("/chats");
        },
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data?.message);
            }
            console.log(err);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    return (
        <div className="container">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        <UserRound />
                        Login
                    </legend>
                    <label htmlFor="email" className="input focus:outline-none">
                        <span className="label">
                            <Mail />
                        </span>
                        <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label htmlFor="password" className="input">
                        <span className="label">
                            <KeyRound />
                        </span>
                        <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
