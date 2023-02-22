import reactDom from 'react-dom'
import './Filter.css'

export default function Filter({open, filterClose}) {
  
    if(!open) return null

    return reactDom.createPortal(
        <div className="filter-modal">
            Filters Testing 
            <button onClick={filterClose} className="modal-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
}