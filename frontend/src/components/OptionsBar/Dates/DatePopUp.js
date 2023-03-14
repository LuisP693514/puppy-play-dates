import reactDom from "react-dom"


export default function DatePopUp({open, closeDate, date, request, otherUser, incoming}) {

  function date () {
    if (request) {
      return (
        <>
            <div>
              {incoming ? 
                <p>Play Date Request from {otherUser.puppyName ? otherUser.puppyName : `${otherUser.username}'s puppy`}</p>
              : 
                <p>Play Date Request for {otherUser.puppyName ? otherUser.puppyName : `${otherUser.username}'s puppy`}</p>}
              <img alt="otherUser-pfp" src={otherUser.profileImageUrl}/>
            </div>
            <div>
              <div>{request?.name} on {request?.date.slice(0,10)}</div>
              {/* <div>Location:</div>
                    <div>Latitude: {request.latitude}</div>
                    <div>Longitude: {request.longitude}</div>  */}
              <p>Details:</p>
              {request.description}
            </div>
        </>
      )
    } else if (date){
      return (
        <>
            <div className="other-user-info">
              <p>Play Date with {otherUser.puppyName ? otherUser.puppyName : `${otherUser.username}'s puppy`}</p>
              <img className="profile-friend-image" src={otherUser.profileImageUrl}/>
            </div>
            <div>
              <div>{date?.name} on {date?.date.slice(0,10)}</div>
              <div>Location:</div>
                    <div>Latitude: {date.latitude}</div>
                    <div>Longitude: {date.longitude}</div> 
              {date.description}
            </div>
          </>
      )
    }
  }

  if(!date) return null;
  if(!request) return null;

  if (!open) return null
  return reactDom.createPortal(
    <>
        <div className="profile-modal">
        <button onClick={() => {closeDate(false)}} className="modal-close">&times;</button>
            {date()}
        </div>
    </>,
  document.getElementById('portal')
  )
}
