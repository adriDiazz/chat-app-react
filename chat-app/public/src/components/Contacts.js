import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import notSelectedImage from '../assets/notSelectedImage.png';
import styled from 'styled-components';
import ChatContainer from './ChatContainer';
const ContactList = ({ contacts, currentUser, changeChat }) => {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUsername(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    },[currentUser]);
    const currentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
    return (
        <>
            {
                currentUserImage && currentUsername && (
                    <Container>
                        <div className="brand">
                            <img src={ logo } alt="logo" />
                            <h2>Vchat</h2>
                        </div>
                        <div className='contacts'>
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div className={`contact ${index === currentSelected ? 'selected' : ""}`} key={index} onClick={() => currentChat(index, contact)}>
                                            <div className='avatar'>
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar'/>    
                                            </div>
                                            <div className='username'>
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                    
                                })
                            }
                        </div>
                    </Container>
                )
            }
            {
                

            }
            
        </>
    );
}
const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: grey;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2.6rem;
        }
        h2 {
            color: black;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 1rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: grey;
                width: 0.2rem;
                border-radius: 1rem;
            }
        }

        .contact {
            background-color: #cacacf;
            width: 90%;
            cursor: pointer;
            border-radius: 0.25rem;
            padding: 0.9rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            transition: 0.5s ease-in-out;

        }
        .avatar {
            height: 3rem;
            width: 3.5rem;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .selected {
            background-color: #a5a5a8;
        }
    }
`

export default ContactList;
