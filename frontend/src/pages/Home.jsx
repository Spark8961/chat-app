import RegisterForm from "../components/RegisterForm.jsx";
import SigninForm from "../components/LoginForm.jsx";
import { useState } from "react";

const Home = () => {
    const [isNew, setIsNew] = useState(true);

    const changeForm = () => {
        setIsNew(!isNew);
    };

    return <div className="container">{isNew ? <RegisterForm switchForm={changeForm} /> : <SigninForm switchForm={changeForm} />}</div>;
};

export default Home;
