import React from 'react';

function Popup(props) {
    const { taskData } = props;
    const { isType, data } = taskData;
    return (
        <div className="modal" tabIndex="-1" id='todo-modal'>
            <div className="modal-dialog">
                <div className="modal-content bg-primary text-white">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            isType === "view" ?
                                <div>View</div>
                                : isType === "edit" ?
                                    <div>Edit</div>
                                    :
                                    <div>Delete</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;