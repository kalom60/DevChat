import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';

function Register() {
 const navigate = useNavigate()
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedinProfile: "",
    githubProfile:"",
    experience: "",
    specialization: "",
    address: "",
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
            firstName, lastName, password,
            username, email,
            linkedinProfile, githubProfile, experience,
            specialization, address
        } = values;

        const {data} = await axios.post(registerRoute, {firstName, lastName, password,
             username, email,
            linkedinProfile, githubProfile, experience,
            specialization, address});

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
    const {password, confirmPassword, username, email} = values;
    if(password !== confirmPassword) {
        toast.error(
            "password should be the same",
            toastOptions
            );
        return false;
    }
    else if (username.length < 3) {
        toast.error(
            "username should be greater than 3 characters",
            toastOptions
        );
        return false;
    }
    else if (password.length < 8) {
        toast.error(
            "password should be equal to or greater than 8 characters",
            toastOptions
        );
        return false;
    }
    else if (email === "") {
        toast.error("email is required", toastOptions)
        return false
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
            <div className="two-in-one">
                <input
                    type="text"
                    name="firstName"
                    placeholder='first-name'
                    onChange={e => handleChange(e)}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder='last-name'
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="two-in-one">
                <input
                    type="username"
                    name="username"
                    placeholder='Username'
                    onChange={e => handleChange(e)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="two-in-one">
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    onChange={e => handleChange(e)}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder='Confirm Password'
                    onChange={e => handleChange(e)}
                />  
            </div>
            <div className="two-in-one">
                <input
                    type="url"
                    name="linkedinProfile"
                    placeholder='Linkedin Profile'
                    onChange={e => handleChange(e)}
                />
                <input
                    type="url"
                    name="githubProfile"
                    placeholder='Github Profile'
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="two-in-one">
                <input
                    type="text"
                    name="experience"
                    placeholder='Experience'
                    onChange={e => handleChange(e)} 
                />
                <input
                    type="text"
                    name="specialization"
                    placeholder='specialization'
                    onChange={e => handleChange(e)}
                />
            </div>
            <input
                type="text"
                name="address"
                placeholder='Address'
                onChange={e => handleChange(e)}
            />
            <button type='submit' >Register</button>
            <span>Already have an account? <Link to="/login">Login</Link> </span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.two-in-one {
    display:flex;
    gap: 2rem;
}
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

export default Register
