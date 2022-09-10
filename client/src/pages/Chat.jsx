/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios  from "../axiosInstance"
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)


  useEffect(()=> {
    if(!localStorage.getItem("devChatUser")) {
      navigate("/login")
    } else {
      setCurrentUser({username: "nati"})
    }
    // else {
    //   axios.get('/me').then((res) => {
    //     console.log(res.data)
    //   })
    // }
  },[])

  useEffect(()=> {
    axios.get('/users')
        .then((res) => {
          setContacts(res.data)
        }).catch((err) => {
          console.log(err.response.data);
        });
  },[])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {
          currentChat === undefined ? (
            <Welcome currentUser={currentUser}  />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #EEF2F7;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #4070f4;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat
