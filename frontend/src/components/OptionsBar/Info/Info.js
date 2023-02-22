import React from 'react'
import ReactDom from 'react-dom'
import './Info.css'

export default function Info({open, infoClose}) {


    if (!open) return null
    return ReactDom.createPortal(
        <div className="options-modal">
            TESTING INFO MODAL
            <button onClick={infoClose} className="modal-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
}