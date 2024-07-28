import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register as registerRequest } from "../../api/api.js";
import toast from "react-hot-toast";


export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (email, password, username) => {
        setIsLoading(true);

        try {
            const response = await registerRequest({ email, password, username });
            setIsLoading(false);

            if (response.error) {
                return toast.error(response?.exception?.response?.data || "Error occured while Registering. Please try again")

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
        register,
        isLoading,
    };
};
