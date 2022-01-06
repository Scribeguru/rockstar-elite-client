import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Form, Col, FormGroup, Input, Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

export default function Login(props) {

  const [isModalOpen, modalSwitch] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    props.setLoggedIn(false);
  });

  const forceClick = useRef();

  const loading = (
    <>
      <Col xs="4" />
      <Col>
        <div className="stage">
          <div className="dot-carousel"></div>
        </div>
      </Col>
      <Col xs="4" />
    </>
  );

  function toggleModal() {
    modalSwitch((isModalOpen) => isModalOpen = !isModalOpen);
  }

  function transportUser() {
    forceClick.current.click();
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      fetch(baseUrl + 'users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: e.target[0].value,
          password: e.target[1].value
        })
      })
        .then(res => {
          if (res.statusText === 'Unauthorized') {
            alert('User information not found. Please create an account or try again.');
          }
          return res.json()
        })
        .then(loginStatus => {
          (loginStatus.success) ? transportUser() : alert('Please try again.')
        });
    }
    catch (err) {
      console.log(err);
      alert('Please try again.');
    }
  }

  function validatePasswordMatch(e) {
    console.log(e);
    return (e.target[1].value === e.target[2].value) ? true : alert(`Please ensure your passwords match.`);
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    //setLoading(true)
    let passwordMatch = await validatePasswordMatch(e);
    if (passwordMatch) {
      try {
        //attempt to post new user data to /register. If successful, notify user and inform them they can login. If unsuccessful, notify them of the issue and how they can fix it, otherwise ask them to try again.
        //then(setLoading(false))
        alert('Thank you for registering with Rockstar Elite, you may now login.');
      }
      catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  }

  function guestLogin() {
    fetch(baseUrl + 'users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'guest',
        password: 'guest'
      })
    })
    return "/arsenal";
  }

  return (
    <Container fluid={true}>
      <Row>
        <Form onSubmit={e => handleLoginSubmit(e)}>
          <Col className="text-center">
            <FormGroup>
              <Label className="mt-3 title" htmlFor="username">Username:</Label>
              <Input name="username" id="username" required />
              <Label className="mt-3 title" htmlFor="password">Password:</Label>
              <Input type="password" name="password" id="password" required />
              <Link to="/arsenal" ref={forceClick} replace hidden />
              <Button
                id="logIn"
                name="logIn"
                type="submit"
                className="shadow-none mt-3"
                size="lg" color="secondary"
                outline>
                Log In
              </Button>
            </FormGroup>
          </Col>
        </Form>
        <Col xs="12" className="text-center mt-5">
          <Button
            id="registerNewUser"
            name="registerNewUser"
            className="shadow-none"
            size="lg"
            color="secondary"
            outline
            onClick={toggleModal}>
            Register
          </Button>
        </Col>
        <Col xs="12" className="text-center mt-5">
          <Link to={guestLogin}>
            <Button className="shadow-none" size="lg" color="secondary" outline >
              Log In as Guest
            </Button>
          </Link>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <h4 className="title">Register as New User</h4>
        </ModalHeader>
        <ModalBody className="text-center">
          <Form onSubmit={e => handleRegisterSubmit(e)}>
            <Label htmlFor="registerUsername">Username:</Label>
            <Input id="registerUsername" name="registerUsername" required />
            <Label htmlfor="registerPassword" name="registerPassword">Password:</Label>
            <Input type="password" id="registerPassword" name="registerPassword" required />
            <Label htmlfor="confirmPassword" name="confirmPassword">Confirm Password:</Label>
            <Input type="password" id="confirmPassword" name="confirmPassword" required />
            <Button id="registerNewUser"
              name="registerNewUser"
              type="submit"
              className="shadow-none mt-4"
              size="lg"
              color="secondary"
              outline>Register</Button>
          </Form>
          {(isLoading) ? loading : null}
        </ModalBody>
      </Modal>
    </Container>
  );
}