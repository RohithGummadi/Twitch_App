import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginRequest } from "../../api/api.js";
import toast from "react-hot-toast";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);

        try {
            const response = await loginRequest({ email, password });
            setIsLoading(false);

            if (response.error) {
                return toast.error(response?.exception?.response?.data || "Error occured while logging in. Please try again")
                 
            }

            if (!response || !response.data) {
                console.error("Response data is undefined");
                return; 
            }

            const { userDetails } = response.data;

            if (!userDetails) {
                console.error("User details are missing in the response data");
                return; 
            }

            localStorage.setItem("user", JSON.stringify(userDetails));

            navigate("/");
        } catch (error) {
            setIsLoading(false);
            console.error("Login failed:", error);
        }
    };

    return {
        login,
        isLoading,
    };
};
