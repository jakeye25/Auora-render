import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AnswerUpdate from './AnswerUpdate';
import './AnswerUpdate.css'


function AnswerUpdateFormModal({answer}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='editansbtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i>&nbsp;Edit answer</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AnswerUpdate answer={answer} setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default AnswerUpdateFormModal;
