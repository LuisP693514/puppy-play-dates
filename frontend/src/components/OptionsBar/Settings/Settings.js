import ReactDom from 'react-dom'
import { useState } from 'react'
import ConfirmDelete from './ConfirmDelete/ConfirmDelete'
import AcctDetails from './AcctDetails/AcctDetails'
import './Settings.css'

export default function Settings({open, settingsClose, hideModals}) {
   const [deleteOpen, setDeleteOpen] = useState(false)
   const [acctDetailsOpen, setAcctDetailsOpen] = useState(false)
   
    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="central-modal settings-modal">
                <button onClick={settingsClose} className="modal-close">&times;</button>
                <button className="double-spacer settings-text" onClick={() => {
                    // hideModals()
                    setAcctDetailsOpen(true)}}><p className="settings-text">Change Account Settings</p></button>
                <AcctDetails open={acctDetailsOpen} onClose={() => setAcctDetailsOpen(false)}></AcctDetails>         
                <button className="settings-text" onClick={() => {
                    // hideModals()
                    setDeleteOpen(true)}}><p className="settings-text">Delete Account</p></button>
                <ConfirmDelete open={deleteOpen} onClose={() => setDeleteOpen(false)}></ConfirmDelete>         
            </div>
        </>,
        document.getElementById("portal")
    )
}