/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { Link } from 'react-router-dom';
import '../pages/Welcome.css';
import { BiSearch, BiChat, BiUser, BiLogOutCircle } from 'react-icons/bi';
import { BsKeyboard } from 'react-icons/bs';
import Logout from '../components/Logout';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState();
  const [face, setFace] = useState();
  const token = JSON.parse(localStorage.getItem('devChatUser'));

  // const [devs, setDevs] = useState([]);
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   const users = () => {
  //     axios
  //       .get('/users')
  //       .then((res) => {
  //         setDevs(res.data);
  //         setUsers(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   users();
  // }, []);

  // const filterCards = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   const filteredUsers = devs.filter((dev) =>
  //     `${dev.firstName} ${dev.lastName}`.toLowerCase().includes(value)
  //   );
  //   setUsers(filteredUsers);
  // };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // else {
    //   axios
    //     .get('/me', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       // console.log(res.data.user.chatRoom);
    //       setContacts(res.data.user.chatRoom);
    //     });
    // }
  }, []);

  useEffect(() => {
    axios
      .get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <section className="topbar">
        <div className="topbarContainer">
          <div className="topbarLeft">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="logo">
                DEVChat <BsKeyboard />
              </span>
            </Link>
          </div>
          {/* <div className="topbarCenter">
            <div className="searchbar">
              <BiSearch className="searchIcon" />
              <input
                placeholder="Search for devs"
                onInput={filterCards}
                className="searchInput"
              />
            </div>
          </div> */}
          <div className="topbarRight">
            <div className="topbarLinks">
              <Link to={'/Chat'} className="topbarLink">
                Chat <BiChat />{' '}
              </Link>

              <Link to={'/Profile'} className="topbarLink">
                Profile <BiUser />{' '}
              </Link>
            </div>

            <div className="logout">
              <Logout />{' '}
            </div>
          </div>
        </div>
      </section>

      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
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
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #eef2f7;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #4070f4;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
