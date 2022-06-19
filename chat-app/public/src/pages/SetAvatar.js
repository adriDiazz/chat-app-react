
import React, {useState,useEffect, useCallback, useMemo} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../assets/loading.gif';
import { Buffer } from 'buffer';
import styled from 'styled-components';
import axios from 'axios';

const SetAvatar = () => {
    const api = 'http://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.isAvatarImage){
            navigate('/chat');
        }else{
            
        }
    }, [navigate]);

    const setProfilePicture = async() => {
        if(selectedAvatar === undefined){
            toast.error('Please select an avatar');
            
        }else {
            const user = await JSON.parse(localStorage.getItem('user'));
            console.log(user);
            const {data} = await axios.post("http://localhost:3001/api/users/setAvatar" + user._id,{
                    image:avatars[selectedAvatar],
            })
            console.log(data);

            if(data.status === true){
                user.isAvatarImage = true;
                user.avatarImage = avatars[selectedAvatar];
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/chat');
        }else {
            toast.error("Error setting avatar");
        }
    }
    }

    const fetchData = useCallback(async() => {
        const data = []
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)

            const buffer = new Buffer(image.data);
            data.push(buffer.toString('base64'))
        }

        setAvatars(data)
        setLoading(false)
    }, [api])

    useEffect( () => {
        fetchData().catch(err => {
            console.log(err);
        });
    },[fetchData]);
    return (
        <>
            {
                loading ? <Container>
                    <img src={loader} alt="loading" className='loader'/>
                </Container> :             <Container>
                <div className='title-container'>
                    Select your avatar
                </div>
                <div className='avatar-container'>
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar ${selectedAvatar === index 
                                ? 'selected': ''}`} >
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={() => setSelectedAvatar(index)}/>
                                </div>
                            )
                        })
                    }
                </div>
                <button className='submit-btn' onClick={setProfilePicture}>Set as profile picture</button>
            </Container>
            }
            <ToastContainer/>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    background-color: #101012;;
    height: 100vh;
    width: 100vw;
    
    .title-container {
        font-size: 2rem;
        color: #fff;
    }
    .avatar-container {
        display: flex;
        gap: 1rem;
    }
    .avatar {
        border: 1px solid transparent;
        padding: 1rem;
        transition: 0.3s ease-in-out;
        img {
            height: 6rem;
        }
    }
    .selected {
        border: 1px solid #fff;
    }
    .submit-btn {
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
    .loader {
        width: 100px;
    }
`
export default SetAvatar;
