import reactDom from 'react-dom'
import './Dates.css'


export default function Dates({open, datesClose}) {

    if (!open) return null
    return reactDom.createPortal(
        <>
            <div className='options-modal'>
                Testing Dates
                <button onClick={datesClose} className='modal-close'>&times;</button>
            </div>
        </>,
        document.getElementById("portal")
    )
}
