import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionCreate from './QuestionCreate';
import './QuestionCreate.css'

function NavQuestionCreateFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div className='navaddquestion' onClick={() => setShowModal(true)}>Add question</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <QuestionCreate setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default NavQuestionCreateFormModal;
