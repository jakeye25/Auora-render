import React, { useState } from 'react';
import {Modal} from "../../../context/Modal"
import SignUpForm from './SignUpForm';
import './SignUpForm.css'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='signuptrigger' onClick={() => setShowModal(true)}>Sign Up with email</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {/* <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div> */}
            <SignUpForm setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default SignupFormModal;
