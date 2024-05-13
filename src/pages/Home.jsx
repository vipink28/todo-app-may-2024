import React from 'react';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column text-white bg-primary'>

                    <h1 className='display-5 text-center'>
                        An App to<br />
                        make your life<br />
                        <span className='display-2'>easy</span>
                    </h1>


                </div>

                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column'></div>
            </div>
        </div>
    );
}

export default Home;