import React from 'react'
import ReactDom from 'react-dom'
import './Friends.css'

export default function Friends({open, friendsClose}) {


    if (!open) return null
    return ReactDom.createPortal(
        <div className="friends-modal">
            TESTING FRIENDS
            <button onClick={friendsClose} className="friends-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
}
