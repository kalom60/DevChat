import React from 'react';
import './Chat.css';
import axios from '../axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Cards';
import './Welcome.css';
import { useEffect, useState } from 'react';
import { BiSearch, BiChat, BiUser, BiLogOutCircle } from 'react-icons/bi';
import { BsKeyboard } from 'react-icons/bs';
import Logout from '../components/Logout';

function Welcome() {
  const navigate = useNavigate();
  const [devs, setDevs] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const users = () => {
      axios
        .get('/users')
        .then((res) => {
          setDevs(res.data);
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    };
    users();
  }, []);

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = devs.filter((dev) =>
      `${dev.firstName} ${dev.lastName}`.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
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
          <div className="topbarCenter">
            <div className="searchbar">
              <BiSearch className="searchIcon" />
              <input
                placeholder="Search for devs"
                onInput={filterCards}
                className="searchInput"
              />
            </div>
          </div>
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

      <section className="body">
        <div className="cards-container">
          {users.map((dev, index) => (
            <Card key={index} user={dev} />
          ))}

          {/* {users.map((dev, index) => (
            <Card key={index} user={dev} />
          ))}

          {users.map((dev, index) => (
            <Card key={index} user={dev} />
          ))}

          {users.map((dev, index) => (
            <Card key={index} user={dev} />
          ))}

          {users.map((dev, index) => (
            <Card key={index} user={dev} />
          ))}

          {users.map((dev, index) => (
            <Card key={index} user={dev} />
          ))} */}
        </div>
      </section>
    </>
  );
}

export default Welcome;
