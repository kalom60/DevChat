import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEnvelope, BiLock, BiLowVision } from 'react-icons/bi';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { loginRoute } from "../utils/ApiRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      console.log(username, password);
      // const { data } = await axios.post('/login', {
      //   username,
      //   password,
      // });
      // if (data.status === false) {
      //   toast.error(data.msg, toastOptions);
      // }
      // if (data.status === true) {
      //   localStorage.setItem(
      //     process.env.REACT_APP_LOCALHOST_KEY,
      //     JSON.stringify(data.user)
      //   );

      //   navigate('/');
      // }
    }
  };

  return (
    <>
      <FormContainer>
        <div className="body">
          <div className="container">
            <div className="devchat">
              <h1>DevChat</h1>
            </div>
            <div className="forms">
              <div className="form login">
                <span className="title">Login</span>

                <form action="" onSubmit={(event) => handleSubmit(event)}>
                  <div className="input-field">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      required
                      name="username"
                      onChange={(e) => handleChange(e)}
                      min="3"
                    />
                    <i className="icon">
                      <BiEnvelope />
                    </i>
                  </div>

                  <div className="input-field">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      name="password"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="icon">
                      <BiLock />
                    </i>
                    <i className="showHidePW">
                      <BiLowVision />
                    </i>
                  </div>

                  <div className="forget">
                    <Link to="/register" className="text">
                      Forget password?
                    </Link>
                  </div>

                  <div className="button">
                    <button type="submit">Login</button>
                  </div>
                </form>

                <div className="login-signup">
                  <span className="text">
                    Not a member?{'   '}
                    <Link to="/register" className="signup-text">
                      Signup
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  .body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EEF2F7;
  }

  .container {
    position: relavtive;
    max-width: 430px;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);
  }

  .container .devchat {
    margin-top: 20px;
  }

  .devchat h1 {
    text-align: center;
  }

  .container .form {
    padding: 30px;
  }

  .container .form .title {
    position: relative;
    font-size: 27px;
    font-weight: 600;
  }

  .form .title::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    background-color: #4070f4;
    border-radius: 25px;
  }

  .form .input-field {
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 30px;
  }

  .input-field input {
    postion: absolute;
    height: 100%;
    width: 100%;
    padding: 0 35px;
    border: none;
    outline: none;
    font-size: 16px;
    border-bottom: 2px solid #ccc;
    border-top: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .input-field input:is(:focus, :valid) {
    border-bottom-color: #4070f4;
  }

  .input-field i {
    margin-top: 10px;
    position: absolute;
    top: 50%
    transform: translateY(-50%);
    color: #999;
    font-size: 23px;
    transition: all 0.2s ease;
  }

  .input-field input:is(:focus, :valid) ~ i{
    color: #4070f4;
  }

  .input-field i.icon {
    left: 0;
  }

  .input-field i.showHidePW {
    right: 0;
  }

  .form .forget{
    margin-top: 20px;
    position: relative;
  }

  .form .text {
    color: #333;
    font-size: 14px;
  }

  .form .forget .text {
    color: #4070f4;
    text-decoration: none;
  }

  .form .forget .text:hover {
    text-decoration: underline;
  }

  .form .button {
    margin-top: 30px;
  }

  .form .button button{
    position: relative;
    height: 50px;
    width: 100%;
    border: none;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 6px;
    background-color: #4070f4;
    transition: all 0.3s ease;
  }

  .button input:hover {
    background-color: #265df2;
  }

  .login-signup {
    margin-top: 25px;
    text-align: center;
  }

  .signup-text {
    font-size: 14px;
    color: #4070f4;
    text-decoration: none;
  }

  .signup-text:hover {
    text-decoration: underline;
  }
`;
