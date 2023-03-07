import reactDom from "react-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, selectCurrentUser } from "../../../../store/session"
import { updateUser } from "../../../../store/users"
import './AcctDetails.css'

export default function AcctDetails({open, onClose}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
      const [editing, setEditing] = useState(null);

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch])

    
    useEffect(() => {
        setEditing(null);
    }, [currentUser]);

    const handleEdit = (field) => {
        setEditing(field);
    };

    const handleCancel = () => {
        setEditing(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const updatedUser = {
            ...currentUser,
            [editing]: formData.get(editing),
        };

        await dispatch(updateUser(updatedUser));
        dispatch(getCurrentUser());
    };

    if (!open) return null

    return reactDom.createPortal(
        <>
        <div>
            <div className='central-modal'>
            <button onClick={onClose} className="modal-close">&times;</button>
            <div className="delete-text orange-text"><h3>Update Account Information</h3></div>
            <form onSubmit={handleSubmit}>
                <div className="settings-update">
                <div className="settings-div">
                    UserName:{" "}
                    {editing === "username" ? (
                    <input type="text" name="username" defaultValue={currentUser.username} />
                    ) : (
                    currentUser.username
                    )}
                </div>
                {editing === "username" ? (
                    <>
                    <button className="button settings-button" type="submit">
                        Submit
                    </button>
                    <button className="button settings-button" onClick={handleCancel}>
                        Cancel
                    </button>
                    </>
                ) : (
                    <button className="button settings-button" onClick={() => handleEdit("username")}>
                    Edit
                    </button>
                )}
                </div>
                <div className="settings-update">
                <div className="settings-div">
                    Email:{" "}
                    {editing === "email" ? (
                    <input type="email" name="email" defaultValue={currentUser.email} />
                    ) : (
                    currentUser.email
                    )}
                </div>
                {editing === "email" ? (
                    <>
                    <button className="button settings-button" type="submit">
                        Submit
                    </button>
                    <button className="button settings-button" onClick={handleCancel}>
                        Cancel
                    </button>
                    </>
                ) : (
                    <button className="button settings-button" onClick={() => handleEdit("email")}>
                    Edit
                    </button>
                )}
                </div>
                <div className="settings-update">
                <div className="settings-div">
                    Password: **********
                </div>
                <button className="button settings-button" disabled>
                    Edit
                </button>
                </div>
            </form>
            </div>
        </div>
        </>,
        document.getElementById("portal")
    );
}
