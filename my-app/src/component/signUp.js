import React, { useState,useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../css/signup.css";
const Signup = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        title: 'Mr',
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
    });

    const [globalError, setGlobalError] = useState("");
    // Check for token in cookies
    useEffect(() => {
      const token = Cookies.get('x-api-key');
      if (token) {
          navigate('/home'); // Redirect to home page if token is present
      }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("Previous data:", formData); // Log previous data
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            
        }));
        validateForm();
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.fname) {
            isValid = false;
            errors.fname = '*Firstname is required';
        }

        if (!formData.lname) {
            isValid = false;
            errors.lname = '*Lastname is required';
        }

        if (!formData.email) {
            isValid = false;
            errors.email = '*Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            errors.email = '*Invalid email address';
        }

        if (!formData.password) {
            isValid = false;
            errors.password = '*Password is required';
        } else if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(formData.password)) {
            isValid = false;
            errors.password = '*Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number';
        }

        setFormErrors(errors);
        setGlobalError("")
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            // Submit the form data or perform any necessary actions here
            console.log('Form submitted successfully');

            // Add your fetch request here
            const data = await fetch('https://mini-blogs.onrender.com/authors', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fname: formData.fname,
                    lname: formData.lname,
                    title: formData.title,
                    email: formData.email,
                    password: formData.password,
                }),
            })
            
            const createData = await data.json()

            if (createData.status) {
                console.log("success");
                navigate("/login")
            } else {
                setGlobalError(createData.message)
                console.log("hello1", createData);
            }
        }
    }
    return (
      <div  className="signup-container">
          <div className="signup-image"></div>
          <div class="background-container">
        <div className="background-color">
            <form className="form">
          <h4 style={{fontWeight:'bold',fontSize:30,color:"lightseagreen",textAlign:"center"}}>Create Account</h4>
                <div className="input">
                    <label htmlFor="fname">Firstname :</label>
                    <input type="text" id="name" name="fname" value={formData.fname} onChange={handleInputChange} /><br />
                    {formErrors.fname && <span>{formErrors.fname}</span>}
                </div>
                <div className="input">
                    <label htmlFor="lname">Lastname :</label>
                    <input type="text" id="name" name="lname" value={formData.lname} onChange={handleInputChange} /><br />
                    {formErrors.lname && <span>{formErrors.lname}</span>}
                </div>
                <div className="input">
                    <label>Choose a title: </label>
                    <select name="title" onChange={handleInputChange}>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} /><br />
                    {formErrors.email && <span>{formErrors.email}</span>}
                </div>
                <div className="input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} /><br />
                    {formErrors.password && <span>{formErrors.password}</span>}
                </div>
                <div className="errorMessage">{globalError && <h6>{globalError}</h6>}</div>
                <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button><br />
                <div style={{ textAlign: 'center' }}>
        <Link to="/login" className="login-link">Already have an account ? <span style={{textDecoration:"underline",fontSize:15}}>Login here</span></Link>
                </div>
            </form>
            </div>
            </div>
        </div>
    );
}

export default Signup;
