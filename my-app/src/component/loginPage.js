import React, { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import "../css/login.css";
import Cookies from 'js-cookie'; // Import the js-cookie library

export default function Login() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [globalError, setGlobalError] = useState('');


    useEffect(() => {
        const token = Cookies.get('x-api-key');
        if (token) {
            navigate('/home'); // Redirect to home page if token is present
        }
    }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm();
  };
    
  const validateForm = () => {
    let errors = {};
    let isValid = true;

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
    }

    setFormErrors(errors);
    setGlobalError("");
    return isValid;
  };

  const postData = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Retrieve token from cookies if needed
        let token = Cookies.get('token') || '';

        const data = await fetch('http://localhost:4000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': token,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const loginData = await data.json();
        if (loginData.status) {
          token = loginData.data;  //we get token in this line
          Cookies.set('x-api-key', token,{ expires: 6 / 24 });  // 6 hour expiration time.
          navigate('/home');
        } else {
          setGlobalError(loginData.message);
        }
    }
  };

  return (
    <div className='background'>
      <form className="form-container">
        <h4 style={{fontWeight:'bold',fontSize:30,color:"darkturquoise",textAlign:"center"}}>Login</h4>
        <div className="fild">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          <br />
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>
        <div className="fild">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
          <br />
          {formErrors.password && <span>{formErrors.password}</span>}
        </div>
        <div className="errorMessage">{globalError && <span style={{color: 'rgb(12, 93, 27)', fontSize:"large",fontWeight:600}}>{globalError}</span>}</div>
        <button className="button1" onClick={postData}>
          Login
        </button>
        <div className="divider-container">
        <span className="divider"></span>
        <span className="or-text">or</span>
        <span className="divider"></span>
</div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/" className="login-link">Create your account. <span style={{textDecoration:"underline",fontSize:15}}>click here</span></Link>
        </div>
      </form>
    </div>
  );
}
