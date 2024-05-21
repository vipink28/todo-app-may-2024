import React from 'react';
import TaskForm from '../components/TaskForm';

function CreateTask(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column text-white bg-primary'>
                    <TaskForm />
                </div>

                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column'>
                    <div className='card w-50'>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;