import reactDom from "react-dom"


export default function DatePopUp({open, closeDate, date, request}) {

  function date () {
    if (request) {
      return (
        <>
          <div>{request.name}</div> 
          <div>{request.date.slice(0,10)}</div>
          <div>{request.description}</div>
        </>
      )
    } else{
      return null
    }
  }
   
  if (!open) return null
  return reactDom.createPortal(
    <>
        <div className="profile-modal">
        <button onClick={() => {closeDate(false)}} className="modal-close">&times;</button>
            {date()}
            We need date info here
        </div>
    </>,
  document.getElementById('portal')
  )
}
