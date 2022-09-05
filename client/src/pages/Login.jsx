import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';

function Login() {
 const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions  = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
        const {
            password,
            username
        } = values;

        const {data} = await axios.post(loginRoute, {password,
             username});

            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem('devChat-user', JSON.stringify(data.user))
                navigate("/")
            }
        }
  }

  const handleValidation = () => {
    const {password, username} = values;
    if (username.length === "") {
        toast.error(
            "username can't be empty",
            toastOptions
        );
        return false;
    }
    if (password.length === "") {
      toast.error(
          "password can't be empty",
          toastOptions
      );
      return false;
  }
    return true;
  }

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=> handleSubmit(event)}>
            <div className="logo">
                <h1>DevChat</h1>
            </div>
                <input
                    type="username"
                    name="username"
                    placeholder='Username'
                    onChange={e => handleChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    onChange={e => handleChange(e)}
                />
            <button type='submit' >Login</button>
            <span>Don't have an account?<Link to="/register">Register</Link> </span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
width:100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
        border: 0.2rem solid #997af0;
        outline: none;
    }
  }
  button {
    background-color: #997a70;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-wieght: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
        background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-align: center;
    a {
        color: orange;
        text-decoration: none;
        font-weight: bold;
    }
  }
}
`;

export default Login
