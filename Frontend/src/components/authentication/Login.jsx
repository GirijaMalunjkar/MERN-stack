import React, {useState} from "react";
import "./Authentication.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    // Perform sign-in logic if form is valid
    if (validateForm()) {
      
    navigate("/home");
    toggleForm();
      console.log('Form is valid. Performing sign-in.');
    } else {
      console.log('Form is invalid. Please check errors.');
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
        <div className={"user"}>
          <div className="imgBx">
            <img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg" alt="" />
          </div>
          <div className="formBx">
          <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
      <h2>Sign In</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      {errors.username && <p className="error">{errors.username}</p>}

      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      {errors.password && <p className="error">{errors.password}</p>}

      <input type="submit" value="Login" />
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
