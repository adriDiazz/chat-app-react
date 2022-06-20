import React,{useState, useEffect, useCallback, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ContactList from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import notSelectedImage from '../assets/notSelectedImage.png';
import io from 'socket.io-client';
const Chat = () => {
    const socket = useRef()
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [chat, setChat] = useState(undefined);

    const getContacts = useCallback( async() => {
        
        if(currentUser) {
            if(currentUser.isAvatarImage) {
                
                const {data} = await axios.get(`http://localhost:3001/api/users/${currentUser._id}`);
                
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
        if(currentUser){
            socket.current = io.connect('http://localhost:3001');
            socket.current.emit('add-user', currentUser._id);
        }
    }, [currentUser])

    useEffect(() => {
        getContacts().catch(err => console.log(err));        
    }, [navigate, currentUser,getContacts]);

    return (
        <>
            <Container>
                <div className='container'>
                    <ContactList contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                    {
                    chat === undefined ?
                            <ContainerImage>
                                <img src={notSelectedImage} alt='welcomeImage'/>
                                <span>Welcome to Vchat lets talk!</span>
                            </ContainerImage>
                        :
                            <ChatContainer selected={chat} currentUser={currentUser} socket={socket}/>
                 }
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

const ContainerImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        height: 25rem;
    }
    span {
        color: black;
        font-size: 2rem;
    }
`
export default Chat;
