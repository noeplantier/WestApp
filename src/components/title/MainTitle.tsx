import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';


const MainTitle = () => {

const [showLoginModal, setShowLoginModal] = useState(false);

const handleOpenLoginModal = () => {
  setShowLoginModal(true);
};

const handleCloseLoginModal = () => {
  setShowLoginModal(false);
};


return (

<div className="flex justify-center items-center min-h-screen">
        <div className="text-center my-2 p-6" id='main-container'>
          <h1 className="text-purple-700 text-9xl font-bold" id='main-title'>WestApp</h1>
          <h2 className="text-gray-600 text-4xl mt-4">Passez de l'URL à l'IRL</h2>
          <div className="mt-8">
            <a href="/explanations" className="btn btn-primary mr-4">Get Started</a>
            <Button variant="secondary" onClick={handleOpenLoginModal}>Se Connecter</Button>
    

    <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
      <Modal.Header closeButton>
        <Modal.Title>Connexion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseLoginModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
        </div>
      </div>
);
}

export default MainTitle;