import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProfilePopUp from './ProfilePopUp.js';

function ProfileModal() {
  
const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <button className="double-spacer test" onClick={() => {
        setProfileOpen(true)}}>Profile Modal</button>
      <ProfilePopUp open={profileOpen} profileClose={() => setProfileOpen(false)}></ProfilePopUp>
    </>
  );
}

export default ProfileModal;