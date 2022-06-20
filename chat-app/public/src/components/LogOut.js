import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const LogOut = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }
    return (
        <>
            <Buton onClick={handleClick}>Logout</Buton>
        </>
    );
}

const Buton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
`
export default LogOut;
