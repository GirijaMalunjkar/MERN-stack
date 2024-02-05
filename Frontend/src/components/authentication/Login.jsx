import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // Make a POST request to the server for user authentication
      const response = await axios.post('http://localhost:5000/loginUser', {
        email: formData.email,
        password: formData.password,
      });

      // Set the login message based on the response
      setLoginMessage(`Login successful: ${response.data}`);

      // Show an alert with the login message
      window.alert(loginMessage);

      // Navigate to the home page or perform other actions
      navigate("/home");
      toggleForm();
      console.log('Form is valid. Performing sign-in.');
    } catch (error) {
      console.error('Error during login:', error.response.data);

      // Set the login message for invalid credentials
      setLoginMessage(`Invalid credentials: ${error.response.data.message}`);
      setErrors({ login: 'Invalid credentials' });

      // Show an alert with the login message for invalid credentials
      window.alert(loginMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <div className="container">
        <div className="user">
          <div className="imgBx">
            <img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg" alt="" />
          </div>
          <div className="formBx">
            <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
              <h2>Sign In</h2>
              <input type="text" name="email" placeholder="Email Address" onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}

              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
              {errors.password && <p className="error">{errors.password}</p>}

              <input type="submit" value={loading ? 'Logging in...' : 'Login'} disabled={loading} />

              <p className="signup">
                Don't have an account?{' '}
                <Link to="/registration">
                  Sign Up.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
