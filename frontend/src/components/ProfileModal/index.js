import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProfilePopUp from './ProfilePopUp.js';

function ProfileModal( {userId} ) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <button className="double-spacer test" onClick={() => {
        setProfileOpen(true)}}>Profile Modal</button>
      <ProfilePopUp userId={userId} open={profileOpen} profileClose={() => setProfileOpen(false)}></ProfilePopUp>
    </>
  );
}

export default ProfileModal;