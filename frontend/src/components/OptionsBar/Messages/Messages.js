import React from 'react'
import reactDom from 'react-dom'
import './Messages.css'

export default function Messages({open, messagesClose}) {


    if (!open) return null
    return reactDom.createPortal(
        <div className="options-modal">
            <h3 className="orange-text">Messaging Feature Coming Soon!</h3>
            <button onClick={messagesClose} className="modal-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
}