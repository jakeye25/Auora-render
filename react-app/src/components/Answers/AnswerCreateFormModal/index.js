import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AnswerCreate from './AnswerCreate';
import './AnswerCreate.css'

function AnswerCreateFormModal({question}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='create-ansbtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i>&nbsp;Answer</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
           
            <AnswerCreate question={question} setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default AnswerCreateFormModal;
