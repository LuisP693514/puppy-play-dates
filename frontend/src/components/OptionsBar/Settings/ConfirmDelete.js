import './ConfirmDelete.css'
import reactDom from 'react-dom'

export default function ConfirmDelete() {
  return reactDom.createPortal(
    <div>
      <div className='delete-modal'>
            <h2>Are you sure you want to delete your profile?</h2>
            <div className='modal-buttons'>
                <button className='yes-button' onClick={handleConfirmDelete}>
                    Yes
                </button>
                <button className='no-button' onClick={handleCancelDelete}>
                    No
                </button>
            </div>
        </div>
    </div>,
    document.getElementById("portal")
  )
}
