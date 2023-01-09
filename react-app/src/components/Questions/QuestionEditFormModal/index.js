import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionUpdate from './QuestionUpdate';
import './QuestionUpdate.css'

function QuestionUpdateFormModal({question}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='edit-quesbtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i>&nbsp;Edit question</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <QuestionUpdate question={question} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default QuestionUpdateFormModal;
