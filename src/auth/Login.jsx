import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from './AuthContext';

function Login(props) {
    let init = {
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(init);
    const { login, message, setMessage } = useContext(AuthContext);

    useEffect(() => {
        setMessage("");
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const inputField = useRef(null);



    //Errors state
    const [errors, setErrors] = useState({
        email: [],
        password: []
    });

    // Dirty state to check whether input field has value or untouched.
    const [dirty, setDirty] = useState({
        email: false,
        password: false
    });

    const validate = () => {
        let errorsData = {};

        errorsData.email = [];
        //if email is blank
        if (!formData.email) {
            errorsData.email.push("Please provide email");
        }

        let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

        if (formData.email) {
            if (!emailreg.test(formData.email)) {
                errorsData.email.push("Please enter valid email")
            }
        }

        //password
        errorsData.password = [];
        //if email is blank
        if (!formData.password) {
            errorsData.password.push("Please provide password");
        }

        // save all the errors in state
        setErrors(errorsData);
    }

    let isValid = () => {
        let valid = true;
        for (let control in errors) {
            if (errors[control].length > 0) {
                valid = false;
            }
        }
        return valid;
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setDirty((prev) => ({
            ...prev,
            [name]: true
        }))
        validate();
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            login(formData);
        } else {
            const currValue = inputField.current.value;
            if (!currValue) {
                Object.keys(dirty).forEach((key) => dirty[key] = true);
            }
            setMessage("Please resolve errors in the form");
        }
    }

    useEffect(validate, [formData]);


    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input ref={inputField} type="email" name='email' className='form-control' onChange={handleChange} onBlur={handleBlur} />
                <div className='text-danger'>
                    {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </div>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input ref={inputField} type="password" name='password' className='form-control' onChange={handleChange} onBlur={handleBlur} />

                <div className='text-danger'>
                    {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
                </div>

            </div>
            <p>{message}</p>
            <button className='btn btn-primary' onClick={handleSubmit}>Login</button>
        </form>
    );
}

export default Login;