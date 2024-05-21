import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    //to redirect programmatically we use hook - useNavigate();
    const navigate = useNavigate();

    //register function
    const register = async (formData) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`, { method: "GET" });
        if (checkUser.ok) {
            let user = await checkUser.json();
            if (user.length > 0) {
                setMessage("User already exist, please login");
            } else {
                const response = await fetch("http://localhost:5000/users", config);
                if (response.status === 201) {
                    let user = await response.json();
                    localStorage.setItem("todouser", JSON.stringify(user));
                    setUser(user);
                    setMessage("Registered Successfully");
                    setTimeout(() => {
                        navigate("/task-list");
                    }, 3000)
                } else {
                    setMessage("something went wrong, please try again");
                }
            }
        } else {
            setMessage("Something went wrong");
        }
    }


    //login function
    const login = async (formData) => {
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, { method: "GET" });
        if (response.ok) {
            let users = await response.json();
            if (users.length > 0) {
                localStorage.setItem("todouser", JSON.stringify(users[0]));
                setUser(users[0]);
                setMessage("logged in successfully");
                setTimeout(() => {
                    navigate("/task-list");
                }, 3000)
            } else {
                setMessage("Email/Password incorrect");
            }
        } else {
            setMessage("Something went wrong, please try again");
        }
    }

    //check user exists in database.
    const getUserOnLoad = async (email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, { method: "GET" });
        if (response.ok) {
            const userFromServer = await response.json();
            if (userFromServer.length > 0) {
                setUser(userFromServer[0]);
            } else {
                localStorage.removeItem("todouser");
                navigate("/login");
            }

        } else {
            console.log("something went wrong");
        }
    }

    // get user from local storage
    useEffect(() => {
        let localuser = localStorage.getItem("todouser");
        if (localuser) {
            const userFromLocal = JSON.parse(localuser);
            getUserOnLoad(userFromLocal.email);
        } else {
            // navigate("/login");
        }
    }, [])


    const logout = () => {
        localStorage.removeItem("todouser");
        setUser(null);
        navigate("/login");
    }


    return (
        <AuthContext.Provider value={{
            register,
            message,
            setMessage,
            login,
            user,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;

