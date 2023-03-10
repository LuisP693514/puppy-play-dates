import reactDom from "react-dom"


export default function DatePopUp(open, closeDate) {

    if (!open) return null
  return reactDom.createPortal(
    <>
        <div className="modal-overlay"></div>
        <div className="central-modal">
            Testing Date Modal
            {/* <div>{request.name}</div> 
            <div>{request.date.slice(0,10)}</div>
            <div>{request.description}</div>
             */}
        </div>
    </>,
    document.getElementById('Portal')
  )
}
