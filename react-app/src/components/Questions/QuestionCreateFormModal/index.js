import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionCreate from './QuestionCreate';
import './QuestionCreate.css'


function QuestionCreateFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div className='askicon' onClick={() => setShowModal(true)}><i class="fa-solid fa-clipboard-question fa-lg"></i> &nbsp;Ask</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <QuestionCreate setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default QuestionCreateFormModal;
