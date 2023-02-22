import reactDom from "react-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, selectCurrentUser } from "../../../../store/session"
import { updateUser } from "../../../../store/users"
import './AcctDetails.css'

export default function AcctDetails({open, onClose}) {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch])

    
  
    if (!open) return null
    return reactDom.createPortal(
        <>
            <div>
                <div className='central-modal'>
                    <button onClick={onClose} className="settings-close">&times;</button>
                    <div className="delete-text orange-text"><h3>Update Account Information</h3></div>
                    <div>
                        <div className="settings-update">
                            <div className="settings-div">UserName: {currentUser.username}</div>
                            <button className="button settings-button">edit</button>
                        </div>
                        <div className="settings-update">
                            <div className="settings-div">Email: {currentUser.email}</div>
                            <button className="button settings-button">edit</button>
                        </div>
                        <div className="settings-update">
                            <div className="settings-div">Password: **********</div>
                            <button className="button settings-button">edit</button>
                        </div>
                        
                    </div>
 
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}
