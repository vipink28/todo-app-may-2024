import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';

function TaskForm(props) {
    const init = {
        title: "",
        description: "",
        duedate: ""
    }

    const { isUpdate, setIsUpdate, data, isPopup, closeBtn } = props;

    const [formData, setFormData] = useState(init);
    const { message, setMessage, addTask, updateTask } = useContext(TaskContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (isUpdate && data) {
            setFormData(data);
        }
    }, [isUpdate, data])


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
        setFormData(init);
        setTimeout(() => {
            setMessage("");
        }, 3000)
    }

    const cancelUpdate = (e) => {
        e.preventDefault();
        if (isPopup) {
            closeBtn.current.click();
        } else {
            setIsUpdate(false);
        }
        setFormData(init);
    }

    const onUpdate = (e) => {
        e.preventDefault();
        updateTask(formData);
        setTimeout(() => {
            setMessage("");
        }, 3000)
    }


    return (
        <div className='p-3'>
            <h4 className='text-white'>{isUpdate ? "Update Task" : "Create Task"}</h4>

            <div className="card p-3">
                <form>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type="text" name='title' className='form-control' value={formData.title} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <textarea name="description" className='form-control' rows="5" value={formData.description} onChange={handleChange} ></textarea>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Due Date</label>
                        <input type="datetime-local" name='duedate' className='form-control' value={formData.duedate} onChange={handleChange} />
                    </div>
                    <p>{message}</p>
                    {
                        isUpdate ?
                            <>
                                <button className='btn btn-primary' onClick={onUpdate}>Update Task</button>
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