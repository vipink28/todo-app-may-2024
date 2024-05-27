import React, { useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../helper';
import Popup from '../components/Popup';

const reducer = (state, action) => {
    switch (action.type) {
        case "view": return { isType: "view", data: action.payload };
        case "edit": return { isType: "edit", data: action.payload };
        case "delete": return { isType: "delete", data: action.payload };
        default: return state;
    }
}

function TaskList(props) {
    const { allTasks } = useContext(TaskContext);
    const [state, dispatch] = useReducer(reducer, { isType: "", data: null });
    return (
        <div className='container py-5'>
            <div className='bg-primary text-white p-3'>
                <div className='d-flex align-items-center'>
                    <h3>Task List</h3>
                    <Link to="/create-task" className='btn btn-info ms-auto'>Create Task</Link>
                </div>

                <div className='p-3'>
                    {/* header row */}
                    <div className='row mb-3'>
                        <div className='col-1'>Sr. No.</div>
                        <div className='col-3'>Title</div>
                        <div className='col-4'>Description</div>
                        <div className='col-2'>Due Date</div>
                        <div className='col-2'>Actions</div>
                    </div>
                    {
                        allTasks ?
                            allTasks.map((task) => {
                                return (
                                    <div key={task.id} className='row bg-secondary mb-2 py-3 rounded-2 align-items-center'>
                                        <div className='col-1'>{task.id}</div>
                                        <div className='col-3'>{task.title}</div>
                                        <div className='col-4'>{task.description}</div>
                                        <div className='col-2'>{formatDate(task.duedate)}</div>
                                        <div className='col-2'>
                                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#todo-modal" onClick={() => { dispatch({ type: "view", payload: task }) }}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </span>
                                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#todo-modal" onClick={() => { dispatch({ type: "edit", payload: task }) }}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </span>
                                            <span className='px-2' data-bs-toggle="modal" data-bs-target="#todo-modal" onClick={() => { dispatch({ type: "delete", payload: task }) }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </div>
                                    </div>
                                )
                            }) : <p>No tasks to display</p>
                    }

                </div>

            </div>
            <Popup taskData={state} />
        </div>
    );
}

export default TaskList;