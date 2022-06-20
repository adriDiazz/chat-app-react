import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import LogOut from '../components/LogOut';
import ChatInput from './ChatInput';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
const ChatContainer = ({selected, currentUser, socket}) => {
    const [messages, setMessages] = useState([]);
    const [arrMessage, setArrMessage] = useState(null);
    const scrollRef = useRef();
    useEffect(() => {
        const getMessages = async() => {
            if(selected){
                const {data} = await axios.post(`http://localhost:3001/api/messages/get`,{
                    from: currentUser._id,
                    to: selected._id
                });
                setMessages(data);
            }
        }

        getMessages().catch(err => console.log(err));

    }, [selected, currentUser]);

    const handleMessage = async(message) => {
         await axios.post(`http://localhost:3001/api/messages`, {
            from: currentUser._id,
            to: selected._id,
            message
        })
        socket.current.emit('send-message', {
            to: selected._id,
            from: currentUser._id,
            message
        })
        
        const msgs = [...messages,{
            fromSelf: true,
            message
        } ]
        setMessages(msgs);
        
    }

    useEffect(() => {
        if(socket.current){
            socket.current.on('receive-message', (message) => {
                setArrMessage({
                    fromSelf: false,
                    message
                });
            })

    }}, [])

    useEffect(() => {
        arrMessage && setMessages((prev) => [...prev, arrMessage]);
    }, [arrMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    },[messages]) 
    return (
        <>
            <Container>
                <div className='header'>
                    <div className='user-details'>
                        <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${selected.avatarImage}`} alt='avatar'/>   
                        </div>
                        <div className='username'>
                            <h3>{selected.username}</h3>
                        </div>
                    </div>
                    <LogOut/>
                </div>
                <div className='messages'>
                    {
                        messages.map((message, index) => {
                           return <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf === true ? "sended" : "received"}`} >
                                        <div className='content'>
                                            <p>{message.message}</p>
                                        </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <ChatInput handleMessage={handleMessage}/>
            </Container>
        </>
    );
}

const Container = styled.div`
    padding: 10px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        
    }
    .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
            img {
                height: 3rem;
            }
        }
        .username {

        }
    }
    .messages {
        height: 80%;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow : auto;
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                border-radius: 0.5rem;
                
                padding: 0.7rem;
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #cacacf;
            }
        }
        .received {
            justify-content: flex-start;
            .content {
                background-color: #e6e6e6;
            }
        }
    }
    
`
export default ChatContainer;
