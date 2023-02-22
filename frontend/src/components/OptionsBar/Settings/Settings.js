import React from 'react'
import ReactDom from 'react-dom'
import './Settings.css'

export default function Settings({open, settingsClose}) {


    if (!open) return null
    return ReactDom.createPortal(
        <div className="options-modal">
            TESTING SETTINGS MODAL
            <button onClick={settingsClose} className="settings-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
}