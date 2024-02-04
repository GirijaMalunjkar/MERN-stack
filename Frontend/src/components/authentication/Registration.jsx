import React, {useState} from "react";
import "./Authentication.css";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (validateForm()) {
      
      navigate("/home");
      toggleForm();
        console.log('Form is valid. Performing sign-in.');
      } else {
        console.log('Form is invalid. Please check errors.');
      }
  };

 
  const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Validate confirmPassword
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
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
          <div className="formBx">
          <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
      <h2>Create an account</h2>
      <input type="text" name="username" placeholder="Username" autoComplete="username" onChange={handleChange} />
      {errors.username && <p className="error">{errors.username}</p>}

      <input type="email" name="email" placeholder="Email Address" autoComplete="email" onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}

      <input type="password" name="password" placeholder="Create Password" autoComplete="new-password" onChange={handleChange} />
      {errors.password && <p className="error">{errors.password}</p>}

      <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" onChange={handleChange} />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

      <input type="submit" value="Registration" />
      <p className="signup">
        Already have an account?{" "}
        <Link to="/">
          Sign in.
        </Link>
      </p>
    </form>
          </div>
          <div className="imgBx">
            <img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
