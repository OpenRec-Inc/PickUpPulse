import React, {useState} from 'react';
import styled from 'styled-components';
import SignUp from '../components/register';
import UserLogin from '../components/userLogin';
import { Container } from '../components/styles/Container.styled';
import VideoBG from "../components/LoginBG";

 function Login({}) {
  const [current, setCurrent] = useState('login')

  const toggle = () => {
    current === 'login' ? setCurrent('register') : setCurrent('login')
  }
  return (
  <Container>
  <VideoBG />
  {current === 'login' ?  <UserLogin toggle={toggle}/> : <SignUp toggle={toggle}/>}
  
  </Container>
  );
}



export default Login;