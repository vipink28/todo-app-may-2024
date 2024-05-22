import React, { useContext, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskContext from '../context/TaskContext';
import { formatDate } from '../helper';

function CreateTask(props) {
    const { latestTask, recentTasks } = useContext(TaskContext);
    const [isUpdate, setIsUpdate] = useState(false);
    const edit = () => {
        setIsUpdate(true);
    }
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column text-white bg-primary'>
                    <TaskForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
                </div>

                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column'>
                    <div className='card bg-primary text-white w-75 p-3'>
                        <div className='d-flex align-items-center'>
                            <h4>Latest Task</h4>
                            <button className='btn btn-info ms-auto' onClick={edit}>Edit Task</button>
                        </div>
                        <div className='py-3'>
                            <h5>{latestTask?.title}</h5>
                            <p>{latestTask?.description}</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <p>Modified On: {formatDate(latestTask?.modified)}</p>
                            <p className='ms-auto'>Due Date: {formatDate(latestTask?.duedate)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;