import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionCreate from './QuestionCreate';
import './QuestionCreate.css'


function QuestionCreateBarFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div className='askbar' onClick={() => setShowModal(true)}>
            <div className='askbar-innertext'>What do you want to ask?</div>
         </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <QuestionCreate setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default QuestionCreateBarFormModal;
