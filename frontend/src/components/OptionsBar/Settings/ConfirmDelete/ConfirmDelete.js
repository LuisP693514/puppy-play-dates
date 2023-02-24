import reactDom from 'react-dom'
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUser } from '../../../../store/users';
import { getCurrentUser, selectCurrentUser } from '../../../../store/session';
import './ConfirmDelete.css'

export default function ConfirmDelete({open, onClose}) {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch]);


  const handleConfirmDelete = e => {
      e.preventDefault();
      dispatch(deleteUser(currentUser._id));
      history.push('/login');
  }


  if (!open) return null
  return reactDom.createPortal(
    <>
      <div className="modal-overlay"></div>
      <div>
        <div className='central-modal'>
              <div className="delete-text orange-text"><h3 className="spacer">Are you sure you want to delete your profile?</h3><h3>This action cannot be un-done.</h3></div>
              <div className='modal-buttons'>
                  <button className='grey-button delete-buttons' onClick={handleConfirmDelete}>Yes</button>
                  <button className='button delete-buttons' onClick={onClose}>No</button>
              </div>
          </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}
