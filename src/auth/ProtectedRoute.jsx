import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    //check user exists in database.
    const getUserOnLoad = async (email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, { method: "GET" });
        if (response.ok) {
            const userFromServer = await response.json();
            if (userFromServer.length > 0) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                navigate("/login");
            }

        } else {
            console.log("something went wrong");
        }
    }


    useEffect(() => {
        let localuser = localStorage.getItem("todouser");
        if (localuser) {
            const userFromLocal = JSON.parse(localuser);
            getUserOnLoad(userFromLocal.email);
        } else {
            setIsLoggedIn(false);
            navigate("/login");
        }
    }, [])


    return (
        isLoggedIn ? children : null
    );
}

export default ProtectedRoute;