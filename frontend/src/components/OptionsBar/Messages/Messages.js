import React from 'react'
import ReactDom from 'react-dom'
import './Messages.css'

export default function Messages({open, messagesClose}) {


    if (!open) return null
    return ReactDom.createPortal(
        <div className="messages-modal">
            TESTING MESSAGES
            <button onClick={messagesClose} className="messages-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
}