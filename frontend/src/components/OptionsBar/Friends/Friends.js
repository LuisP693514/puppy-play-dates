import React from 'react'
import reactDom from 'react-dom'
import './Friends.css'

export default function Friends({open, friendsClose}) {


    if (!open) return null
    return reactDom.createPortal(
        <div className="options-modal">
            TESTING FRIENDS
            <button onClick={friendsClose} className="modal-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
}
