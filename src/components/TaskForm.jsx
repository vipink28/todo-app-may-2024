import React, { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';

function TaskForm(props) {
    const { isUpdate, setIsUpdate } = props;
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

    const cancelUpdate = (e) => {
        e.preventDefault();
        setIsUpdate(false);
    }


    return (
        <div className='w-50'>
            <h4 className='text-white'>{isUpdate ? "Update Task" : "Create Task"}</h4>

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
                    {
                        isUpdate ?
                            <>
                                <button className='btn btn-primary'>Update Task</button>
                                <button className='btn btn-warning ms-2' onClick={cancelUpdate}>Cancel</button>
                            </> :
                            <button onClick={submitForm} className='btn btn-primary'>Create Task</button>
                    }
                </form>
            </div>
        </div>
    );
}

export default TaskForm;