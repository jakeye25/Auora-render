import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionDelete from './QuestionDelete';
import './QuestionDelete.css'


function QuestionDeleteFormModal({question}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='del-quesbtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-trash-can"></i>&nbsp;Delete question</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <QuestionDelete question={question} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default QuestionDeleteFormModal;
