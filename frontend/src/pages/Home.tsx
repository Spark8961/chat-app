import RegisterForm from "../components/home/RegisterForm.jsx";
import SigninForm from "../components/home/LoginForm.jsx";
import { useState } from "react";

const Home = () => {
    const [isNew, setIsNew] = useState(false);

    const changeForm = () => {
        setIsNew(!isNew);
    };

    return <div className="container">{isNew ? <RegisterForm switchForm={changeForm} /> : <SigninForm switchForm={changeForm} />}</div>;
};

export default Home;
