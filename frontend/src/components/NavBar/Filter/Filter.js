import reactDom from 'react-dom'
import './Filter.css'

export default function Filter({open, filterCallback, filters}) {
  
    if(!open) return null

    return reactDom.createPortal(
        <div className="filter-modal">
            <button className={`${filters.includes("petStore") ? 'selected' : ''}`} >
                <img
                    value='petStore' 
                    onClick={filterCallback}  
                    src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/pet-store-icon.png"
                />
            </button>
            <button className={`${filters.includes("dogPark") ? 'selected' : ''}`} >
                <img 
                    value='dogPark' 
                    onClick={filterCallback} 
                    src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dog-park-icon.png"
                />
            </button>
            <button className={`${filters.includes("vet") ? 'selected' : ''}`} >
                <img
                    value='vet' 
                    onClick={filterCallback} 
                    src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/vet-icon.png"
                />
            </button>
            <button className={`${filters.includes("groomer") ? 'selected' : ''}`} >
                <img 
                    value='groomer' 
                    onClick={filterCallback} 
                    src="https://puppyplaydates.s3.us-east-2.amazonaws.com/public/dog-groomer-icon.png"
                />
            </button>
        </div>,
        document.getElementById("portal")
    )
}