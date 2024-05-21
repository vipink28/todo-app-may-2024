import React, { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';

function TaskForm(props) {
    const [formData, setFormData] = useState();
    const { message, setMessage, addTask } = useContext(TaskContext);
    const { user } = useContext(AuthContext);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            userid: user.id,
            modified: Date()
        }))
    }

    const submitForm = (e) => {
        e.preventDefault();
        addTask(formData);
    }

    return (
        <div className='w-50'>
            <h4 className='text-white'>Create Task</h4>
            <div className="card p-3">
                <form>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type="text" name='title' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <textarea name="description" className='form-control' rows="5" onChange={handleChange} ></textarea>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Due Date</label>
                        <input type="datetime-local" name='duedate' className='form-control' onChange={handleChange} />
                    </div>
                    <p>{message}</p>
                    <button onClick={submitForm} className='btn btn-primary'>Create Task</button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;