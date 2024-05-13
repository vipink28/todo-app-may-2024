import React from 'react';
import illustration from '../assets/illustration.png';
import { Link, Outlet } from 'react-router-dom';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column text-white bg-primary'>
                    <h1 className='display-5 text-center mb-5'>
                        An App to<br />
                        make your life<br />
                        <span className='display-2'>easy</span>
                    </h1>
                    <img className='img-fluid' src={illustration} alt="" />
                </div>

                <div className='col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column'>
                    <div className='card w-50'>
                        <div className='card-header d-flex'>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                        <div className="card-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;