import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';

import iconEmoji from '../assets/iconEmoji.png';


const ChatInput = ({handleMessage}) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState('');
    
    const handleEmoji = (e) => {
        setShowEmoji(!showEmoji)
    }

    const handleEmojiClick = (event, emoji) => {
        setMessage(message + emoji.emoji)

    }

    const sendChat = (e) => {
        e.preventDefault();
        if(message.length > 0) {
            handleMessage(message);
            setMessage('');
        }
    }
    return (
        <>
            <Container>
                <div className='button-container'>
                    <button>
                        <img src={iconEmoji} alt='emoji' onClick={handleEmoji}/>
                        {
                            showEmoji && <Picker onEmojiClick={handleEmojiClick} pickerStyle={{ 
                                position: 'absolute',
                                bottom: '200px'
                            }}/>
                        }
                    </button>
                </div>
                <form className='input-container' onSubmit={sendChat}>
                    <input 
                    type='text' 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type a message...'/>
                    <button type='submit'>Send</button>
                </form>
            </Container>
        </>
    );
}

const Container  = styled.div`
    display: flex;
    align-items: center;
    padding: 0.2rem;
    padding-bottom: 0.3rem;
    gap: 1rem;
    overflow: hidden;
    width: 100%;
    .button-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            img {
                height: 2rem;
            }
        }
    }
    .input-container {
        display: flex;
        gap: 0.5rem;
        width: 100%;
        input {
            padding: 0.5rem;
            border-radius: 6px;
            width: 100%;

        }
        button {
            cursor: pointer;
            border-radius: 6px;
            border: none;
            width: 4rem;
            emoji-picker-react {
                position: absolute;
                top: -350px;
            }
        }

    }
`
export default ChatInput;
