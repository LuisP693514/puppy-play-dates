import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProfilePopUp from './ProfilePopUp.js';

function ProfileModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Profile Modal</button>
      {/* the button referenced here should be the pin location of dog */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfilePopUp />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;