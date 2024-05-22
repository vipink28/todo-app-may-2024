import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [latestTask, setLatestTask] = useState(null);
    const [recentTasks, setRecentTasks] = useState(null);
    const [allTasks, setAllTasks] = useState(null);
    const { user } = useContext(AuthContext);

    //add task
    const addTask = async (formData) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const response = await fetch("http://localhost:5000/tasks", config);
        if (response.status === 201) {
            setMessage("Task created successfully");
        } else {
            setMessage("Something went wrong");
        }
    }

    //Get tasks  
    const getAllTasks = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks?userid=${id}`, { method: "GET" });
        if (response.ok) {
            const tasks = await response.json();
            setAllTasks(tasks);
            const latest = tasks[tasks.length - 1];
            setLatestTask(latest);
            const recent = tasks.slice(-3);
            setRecentTasks(recent);
        } else {
            console.log("something went wrong");
        }
    }


    useEffect(() => {
        if (user) {
            getAllTasks(user.id);
        }
    }, [user])


    return (
        <TaskContext.Provider value={{
            message,
            setMessage,
            addTask,
            latestTask,
            recentTasks,
            allTasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;