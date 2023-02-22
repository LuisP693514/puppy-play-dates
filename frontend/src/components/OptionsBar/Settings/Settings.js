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
            <div className="central-modal">
                <button onClick={settingsClose} className="settings-close">&times;</button>
                <button className="double-spacer orange-text" onClick={() => {
                    // hideModals()
                    setAcctDetailsOpen(true)}}><h3>Change Account Settings</h3></button>
                <AcctDetails open={acctDetailsOpen} onClose={() => setAcctDetailsOpen(false)}></AcctDetails>         
                <button className="double-spacer orange-text" onClick={() => {
                    // hideModals()
                    setDeleteOpen(true)}}><h3>Delete Account</h3></button>
                <ConfirmDelete open={deleteOpen} onClose={() => setDeleteOpen(false)}></ConfirmDelete>         
            </div>
        </>,
        document.getElementById("portal")
    )
}