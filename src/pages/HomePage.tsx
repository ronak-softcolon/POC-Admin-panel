import React, { useEffect } from "react";
import ProtectedLayout from "../layout/ProtectedLayout";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/header/AuthHeader";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("data");
        if (token) {
            navigate("");
        } else {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            {/* <ProtectedLayout /> */}
            <AuthHeader />
        </div>
    );
};

export default HomePage;
