import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';


const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber Logo"/>

      <Form onSubmit={() => {}}>
        <h1>Faça seu logon</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

        <Button type="submit">Entrar</Button>

        <a href="#">Esqueci minha senha</a>

      </Form>

      <a href="#"><FiLogIn /> Criar conta</a>
    </Content>
    <Background />
  </Container>
);


export default SignIn;
