import React, { useContext, useState } from 'react';
import AuthContext from './AuthContext';

function Login(props) {
    const [formData, setFormData] = useState(null);
    const { login, message, setMessage } = useContext(AuthContext);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    }

    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="email" name='email' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" name='password' className='form-control' onChange={handleChange} />
            </div>
            <p>{message}</p>
            <button className='btn btn-primary' onClick={handleSubmit}>Login</button>
        </form>
    );
}

export default Login;