import reactDom from 'react-dom'
import './Filter.css'

export default function Filter({open, filterClose}) {
  
    if(!open) return null

    return reactDom.createPortal(
        <div className="filter-modal">
            {/* <button onClick={filterClose} className="modal-close filter-close">&times;</button> */}
            <button><img src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/pet-store-icon.png"/></button>
            <button><img src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dog-park-icon.png"/></button>
            <button><img src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/vet-icon.png"/></button>
            <button><img src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dog-groomer-icon.png"/></button>
            
        </div>,
        document.getElementById("portal")
    )
}