import React,{useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ContactList from '../components/Contacts';
const Chat = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [chat, setChat] = useState(undefined);

    const getContacts = useCallback( async() => {
        console.log(currentUser.isAvatarImage)
        if(currentUser) {
            if(currentUser.isAvatarImage) {
                
                const {data} = await axios.get(`http://localhost:3001/api/users/${currentUser._id}`);
                console.log(data)
                setContacts(data.users);
            }else{
                //console.log('here2')
                //navigate('/avatarSelection');
            }
        }
    }, [currentUser, navigate,]);

    const handleChatChange = (chat) => {
        setChat(chat);
    }


    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/login');
        }else{
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [navigate]);

    useEffect(() => {
        getContacts().catch(err => console.log(err));        
    }, [navigate, currentUser,getContacts]);

    return (
        <>
            <Container>
                <button className='logout-button' onClick={() => {localStorage.removeItem('user'); navigate('/login')}}>Logout</button>

                <div className='container'>
                    <ContactList contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #101012;
    .container {
        background-color: #fff;
        height: 85vh;
        width: 85vw;
        border-radius: 6px;
        display: grid;
        grid-template-columns: 25% 75%;
    }



`
export default Chat;
