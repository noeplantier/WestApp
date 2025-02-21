// Signup.tsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import { SignUp } from '@clerk/clerk-react';

/**
 * Signup modal component wrapping Clerk's <SignUp />.
 *
 * @param show - Modal visibility flag.
 * @param handleClose - Callback to close the modal.
 */
interface SignupProps {
  show: boolean;
  handleClose: () => void;
}

const Signup: React.FC<SignupProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignUp />
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
