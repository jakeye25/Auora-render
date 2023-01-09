import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AnswerDelete from './AnswerDelete';

import './AnswerDelete.css'


function AnswerDeleteFormModal({answer}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='delansbtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-trash-can"></i>&nbsp;Delete answer</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <AnswerDelete answer={answer} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default AnswerDeleteFormModal;
