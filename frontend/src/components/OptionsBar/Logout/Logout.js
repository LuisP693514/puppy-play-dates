import React from 'react'
import ReactDom from 'react-dom'
import './Logout.css'

export default function Logout({open, logoutClose, handleLogout}) {


    if (!open) return null
    return ReactDom.createPortal(
        <>
        <div className='modal-overlay'></div>
        <div className="logout-modal">
            <div className="double-spacer logout-text">Are you sure you want to logout?</div>
            <div className="logout-button-div">
                <button className="grey-button logout-buttons" onClick={handleLogout}>Logout</button>
                <button className="button logout-buttons" onClick={logoutClose}>Cancel</button>
            </div>
        </div>
        </>,
        document.getElementById("portal")
    )
}