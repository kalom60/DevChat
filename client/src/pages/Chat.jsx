/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { allUsersRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts'

function Chat() {
  const navigate = useNavigate()
  const [contacts, setContacts] = ([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function getUser() {
      if(!localStorage.getItem("devChat-user")) {
        navigate("/")
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("devChat-user")))
      }
    }
    getUser()
  }, [])
  useEffect(() => {
    async function getData() {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}`)
        setContacts(data.data)
      } 
      // else {
      //   navigate("/login")
      // }
    }
    getData()
  }, [currentUser])
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser}/>
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
