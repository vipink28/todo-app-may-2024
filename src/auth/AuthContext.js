import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

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
            } else {
                setMessage("Email/Password incorrect");
            }
        } else {
            setMessage("Something went wrong, please try again");
        }
    }

    // get user from local storage
    useEffect(() => {
        let localuser = localStorage.getItem("todouser");
        let user = JSON.parse(localuser);
        setUser(user);
    }, [])


    return (
        <AuthContext.Provider value={{
            register,
            message,
            setMessage,
            login,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;


