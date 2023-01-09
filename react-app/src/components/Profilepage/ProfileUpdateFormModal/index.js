import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ProfileUpdate from './ProfileEdit';

import './ProfileEdit.css'



function ProfileUpdateFormModal({currProfile}) {
    const [showModal, setShowModal] = useState(false);
    // console.log("index", currProfile)
    return (
      <>
         <div id='edit-profilebtn' onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i></div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ProfileUpdate currProfile={currProfile} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default ProfileUpdateFormModal;
