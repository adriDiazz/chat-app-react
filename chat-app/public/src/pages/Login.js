import React, {useState,useEffect} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png';
import styled from 'styled-components';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/login');
        }else{
            navigate('/chat');
        }
    }, [navigate]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(handleValidation()){
            const {username, password} = user;
            const {data} = await axios.post("http://localhost:3001/api/users/login", 
                {username, 
                password
                });

                console.log(data);
                if(data.status === true){
                    toast.success(data.message);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/chat');
                }
                else{
                    toast.error(data.message);
                }
                
        }
    }

    const handleValidation = () => {
        const {username, password} = user;
        if (password === "") {
            toast.error('Email and password is required',{

            });
            return false
        }

        if (username.length === 0) {
            toast.error('Email and password is required',{
 
            });
            return false
        }

        return true

    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value})
    }
    return (
        <>

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className='brand'>
                        <img src={Logo} alt='Logo'/>
                        <h1>Vchat</h1>
                    </div>
                    <input 
                    type="text" 
                    placeholder='Username'
                    name='username' 
                    onChange={handleChange}/>
                    <input 
                    type="password" 
                    placeholder='Password'
                    name='password' 
                    onChange={handleChange}/>
                    <button type='submit'>Login</button>
                    <span>Dont have an account?<NavLink to="/register">Register</NavLink></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #101012;
    .brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        color: black;
        img {
            width: 100px;
        }
        h1 {
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: #fff;
        padding: 3rem 5rem;
        border-radius: 5px;
            input {
                border: none;
                border-radius: 5px;
                padding: 1rem;
                background-color: transparent;
                border-bottom: 0.5px solid #000;
                font-size: 1rem;

                &:focus {
                    border: black solid 0.5px;
                }
            }
            button {
                background-color: #000;
                color: #fff;
                padding: 1rem 2rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: 0.3s ease;
                &:hover {
                    background-color: #313336;
                }
            }
            span {
                color: #000;
                font-size: 1rem;
                a{
                    color: #000;
                }
            }
    }


`;

export default Login;
